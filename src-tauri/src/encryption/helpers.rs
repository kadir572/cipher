use orion::{hazardous::stream::chacha20::CHACHA_KEYSIZE, kdf::{derive_key, Password, Salt}};
use rand_core::{OsRng, RngCore};
use orion::hazardous::aead::xchacha20poly1305::SecretKey;

pub fn generate_nonce() -> Vec<u8> {
    let mut randoms: [u8; 24] = [0; 24];
    OsRng.fill_bytes(&mut randoms);
    randoms.to_vec()
}

pub fn create_key(password: &str, nonce: Vec<u8>) -> Result<SecretKey, ()> {
    let password = Password::from_slice(password.as_bytes()).map_err(|_| ())?;
    let salt = Salt::from_slice(nonce.as_slice()).map_err(|_| ())?;
    let kdf_key = derive_key(&password, &salt, 15, 1024, 32).map_err(|_| ())?;
    SecretKey::from_slice(kdf_key.unprotected_as_bytes()).map_err(|_| ())
}

pub fn generate_auth_tag() -> Vec<u8> {
  let mut randoms: [u8; 32] = [0; 32];
  get_random(&mut randoms);
  return randoms.to_vec();
}

pub fn validate_password(password: &str) -> Result<(), ()> {

  if password.len() < 8 {
      return Err(())
  }

  if password.len() > 32 {
      return Err(())    }

  if !password.chars().any(|c| c.is_uppercase()) {
      return Err(())    }

  if !password.chars().any(|c| c.is_lowercase()) {
      return Err(())    }

  if !password.chars().any(|c| c.is_numeric()) {
      return Err(())    }

  if !password.chars().any(|c| "!@#$%^&*()_+-=[]{}|;:',.<>?".contains(c)) {
      return Err(())    }

  Ok(())
}

pub fn split_encrypted(cipher_text: &[u8]) -> (Vec<u8>, Vec<u8>) {
  return (
      cipher_text[..CHACHA_KEYSIZE].to_vec(),
      cipher_text[CHACHA_KEYSIZE..].to_vec(),
      )
}

pub fn get_random(dest: &mut [u8]) {
  RngCore::fill_bytes(&mut OsRng, dest);
}