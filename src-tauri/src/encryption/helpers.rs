use orion::hazardous::aead::xchacha20poly1305::SecretKey;
use orion::{
    hazardous::stream::chacha20::CHACHA_KEYSIZE,
    kdf::{derive_key, Password, Salt},
};
use rand_core::{OsRng, RngCore};
use thiserror::Error;

/// Custom error type for encryption operations
#[derive(Debug, Error)]
pub enum EncryptionError {
    #[error("Failed to create password from input")]
    PasswordCreation,
    #[error("Failed to create salt from nonce")]
    SaltCreation,
    #[error("Failed to derive key")]
    KeyDerivation,
    #[error("Failed to create secret key")]
    SecretKeyCreation,
    #[error("Password validation failed: {0}")]
    PasswordValidation(String),
}

/// Generates a cryptographically secure nonce for encryption
/// 
/// Returns a 24-byte vector suitable for XChaCha20-Poly1305
#[inline]
pub fn generate_nonce() -> Vec<u8> {
    let mut randoms = [0u8; 24];
    OsRng.fill_bytes(&mut randoms);
    randoms.to_vec()
}

/// Creates an encryption key from a password and nonce
/// 
/// # Arguments
/// * `password` - The user's password
/// * `nonce` - The nonce to use as salt
/// 
/// # Security
/// Uses PBKDF2 with 1024 iterations and SHA-512
pub fn create_key(password: &str, nonce: Vec<u8>) -> Result<SecretKey, EncryptionError> {
    let password = Password::from_slice(password.as_bytes())
        .map_err(|_| EncryptionError::PasswordCreation)?;
    let salt = Salt::from_slice(nonce.as_slice())
        .map_err(|_| EncryptionError::SaltCreation)?;
    let kdf_key = derive_key(&password, &salt, 15, 1024, 32)
        .map_err(|_| EncryptionError::KeyDerivation)?;
    SecretKey::from_slice(kdf_key.unprotected_as_bytes())
        .map_err(|_| EncryptionError::SecretKeyCreation)
}

/// Generates a random authentication tag for AEAD
/// 
/// Returns a 32-byte vector for use as associated data
#[inline]
pub fn generate_auth_tag() -> Vec<u8> {
    let mut randoms = [0u8; 32];
    get_random(&mut randoms);
    randoms.to_vec()
}

/// Validates a password against security requirements
/// 
/// Requirements:
/// - 8-32 characters long
/// - At least one uppercase letter
/// - At least one lowercase letter
/// - At least one number
/// - At least one special character
pub fn validate_password(password: &str) -> Result<(), EncryptionError> {
    if password.len() < 8 {
        return Err(EncryptionError::PasswordValidation(
            "Password must be at least 8 characters long".to_string(),
        ));
    }

    if password.len() > 32 {
        return Err(EncryptionError::PasswordValidation(
            "Password must not exceed 32 characters".to_string(),
        ));
    }

    if !password.chars().any(|c| c.is_uppercase()) {
        return Err(EncryptionError::PasswordValidation(
            "Password must contain at least one uppercase letter".to_string(),
        ));
    }

    if !password.chars().any(|c| c.is_lowercase()) {
        return Err(EncryptionError::PasswordValidation(
            "Password must contain at least one lowercase letter".to_string(),
        ));
    }

    if !password.chars().any(|c| c.is_numeric()) {
        return Err(EncryptionError::PasswordValidation(
            "Password must contain at least one number".to_string(),
        ));
    }

    if !password.chars().any(|c| "!@#$%^&*()_+-=[]{}|;:',.<>?".contains(c)) {
        return Err(EncryptionError::PasswordValidation(
            "Password must contain at least one special character".to_string(),
        ));
    }

    Ok(())
}

/// Splits encrypted data into authentication tag and ciphertext
/// 
/// # Arguments
/// * `cipher_text` - The complete encrypted data
/// 
/// # Returns
/// A tuple of (auth_tag, ciphertext)
#[inline]
pub fn split_encrypted(cipher_text: &[u8]) -> (Vec<u8>, Vec<u8>) {
    (
        cipher_text[..CHACHA_KEYSIZE].to_vec(),
        cipher_text[CHACHA_KEYSIZE..].to_vec(),
    )
}

/// Fills a buffer with cryptographically secure random bytes
/// 
/// # Arguments
/// * `dest` - The buffer to fill with random bytes
#[inline]
fn get_random(dest: &mut [u8]) {
    RngCore::fill_bytes(&mut OsRng, dest);
}
