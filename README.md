# Cipher

**Cipher** is a **File Encryption and Decryption** application built using **Tauri**, **React**, and **Rust**. It allows users to securely encrypt and decrypt files with a password. The app supports handling multiple files at once, includes event logging, and offers a donation feature to support future development.

## Features

- **Encrypt/Decrypt Files**: Securely encrypt and decrypt files using the XChacha20-Poly1305 algorithm.
- **Multi-file Support**: Easily process multiple files at once.
- **Event Logging**: Track app events such as successful encryptions, decryptions, and errors.
- **Donation Handling**: Support the project by donating via integrated payment methods, powered by Stripe.

## Installation for Development

### Prerequisites

To run the app locally, ensure you have the following installed:

- **Node.js** (v20 or later)
- **Rust** (including `cargo` and `rustup`)
- **Tauri CLI**

### Clone the Repository

Follow these steps to set up the project locally:

```bash
# Clone the repository
git clone https://github.com/kadir572/cipher.git
cd cipher

# Install frontend dependencies
npm install

# Install backend dependencies (Rust)
cd src-tauri
cargo install

# Return to the root directory
npx tauri init

# Run the app locally
npx tauri dev
```

## Installation for Usage

To install **Cipher** for your operating system (Windows, Linux, or macOS), download the latest release from [Cipher Releases](https://cipher.kadirk.ch). You can also explore my portfolio at [kadirk.ch](https://kadirk.ch).

### Usage

#### Encryption

1. Select the file(s) you wish to encrypt.
2. Enter a password that will be used for encrypting all selected files.
3. Click "Encrypt" to secure the files. They will be saved in the same location as the original files.

#### Decryption

1. Select the encrypted file(s).
2. Enter the password used during encryption. All selected files must use the same password.
3. Click "Decrypt" to restore the files. They will be saved in the same location as the original encrypted files.

## Contributing

We welcome contributions! If you'd like to improve this project, here are a few ways you can contribute.

1. **Fix Bugs**: Check the issues section for open bugs or enhancements.
2. **Add Feature**: Feel free to propose new features or improvements.
3. **Enhance Documentation**: Help us improve the documentation or provide translations.

### Steps to Contribute

1. Fork the repository.
2. Create a new branch for your changes (e.g., `git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request to the master branch.

Make sure to follow the style and formatting guidelines to ensure the project remains consistent.

## Changelog

### Version 0.1.0 (Nov 22, 2024)

- Initial release with file encryption and decryption capabilities.
- Password strength enforcements.
- Logging system to track events like encryption/decryption success and errors (only session lifetime).
- Donation feature integrated to support further development.
- Dark theme.
- Multi-language support (en, de, it, fr, pl, tr, ar, es, zh, pt, ru, ja, ko, hi), generated using Chat-GPT (GPT-3.5).

### Version 0.2.0 (Nov 22, 2024)

- Async multi-file support for encryption and decryption.

## Roadmap

- Improve password strength checks.
- Improve user interface with better file management.
- Add support for additional encryption algorithms (RSA, SHA-256, etc.).
- Add additional themes.
- Add additional languages.

## Support

If you encounter any issues or have questions about the app, feel free to create an issue in the Issues section of this repository. For direct inquiries, contact [kadir.karadavut@protonmail.com](mailto:kadir.karadavut@protonmail.com).

## License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License** (CC BY-NC 4.0). You can view the full license text [here](https://creativecommons.org/licenses/by-nc/4.0/).

## Donate

If you find this app helpful, consider donating to support future development. Contributions will go towards improving features, adding more encryption options, and maintaining the app.

## Social Media Links

- [GitHub](https://github.com/kadir572)
- [LinkedIn](https://linkedin.com/in/kadir-karadavut)
- [Portfolio Website](https://kadirk.ch)

My name is Kadir Karadavut and the product's first version was released on November 22, 2024.
