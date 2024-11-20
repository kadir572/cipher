import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        encryption: {
          encrypt: 'Encrypt',
          decrypt: 'Decrypt',
          select_file: 'Select file',
          password_placeholder: 'Encryption key',
          reset_message: 'Encryption form has been reset!',
          encrypt_processing: 'Encrypting...',
          decrypt_processing: 'Decrypting...',
          uploaded: 'File uploaded',
          reset: 'Reset',
        },
        language: {
          select: 'Select language',
          search: 'Search language',
          empty: 'No language found',
        },
        tabs: {
          encryption: 'Encryption',
          logs: 'Logs',
          settings: 'Settings',
        },
        footer: {
          developed_by: 'Developed by',
        },
        logs: {
          timestamp: 'Timestamp',
          message: 'Message',
          no_logs: 'No logs available',
        },
        error_messages: {
          decryption_failed: 'Decryption failed',
          encryption_failed: 'Encryption failed',
          file_creation_failed: 'File creation failed',
          file_extension_extraction_failed: 'File invalid',
          file_name_extraction_failed: 'File name extraction failed',
          file_open_failed: "Couldn't open file",
          file_read_failed: "Couldn't read file",
          filename_generation_failed: 'Filename generation failed',
          invalid_password: 'Invalid encryption key',
          key_generation_failed: 'Key generation failed',
          parent_directory_retrieve_failed:
            "Couldn't retrieve parent directory",
          plain_text_too_long: 'Plaintext too long',
          default: 'Server error',
        },
        success_messages: {
          encryption: 'Encryption successful. File saved at',
          decryption: 'Decryption successful. File saved at',
          default: 'Success',
        },
        password: {
          min: 'min. 8 characters',
          max: 'max. 32 characters',
          uppercase: 'At least one uppercase',
          lowercase: 'At least one lowercase',
          number: 'At least one number',
          special: 'At least one special character',
          space: 'No spaces allowed',
        },
      },
    },
    de: {
      translation: {
        encryption: {
          encrypt: 'Verschlüsseln',
          decrypt: 'Entschlüsseln',
          select_file: 'Datei auswählen',
          password_placeholder: 'Verschlüsselungsschlüssel',
          reset_message: 'Das Verschlüsselungsformular wurde zurückgesetzt!',
          encrypt_processing: 'Wird verschlüsselt...',
          decrypt_processing: 'Wird entschlüsselt...',
          uploaded: 'Datei hochgeladen',
          reset: 'Zurücksetzen',
        },
        reset: 'Reset',
        language: {
          select: 'Sprache wählen',
          search: 'Sprache suchen',
          empty: 'Keine Sprache gefunden',
        },
        tabs: {
          encryption: 'Verschlüsselung',
          logs: 'Logs',
          settings: 'Einstellungen',
        },
        footer: {
          developed_by: 'Entwickelt von',
        },
        logs: {
          timestamp: 'Zeitstempel',
          message: 'Nachricht',
          no_logs: 'Keine Logs verfügbar',
        },
        error_messages: {
          decryption_failed: 'Entschlüsselung fehlgeschlagen',
          encryption_failed: 'Verschlüsselung fehlgeschlagen',
          file_creation_failed: 'Dateierstellung fehlgeschlagen',
          file_extension_extraction_failed: 'Datei ungültig',
          file_name_extraction_failed:
            'Fehler beim Extrahieren des Dateinamens',
          file_open_failed: 'Datei konnte nicht geöffnet werden',
          file_read_failed: 'Datei konnte nicht gelesen werden',
          filename_generation_failed: 'Fehler bei der Dateinamenserstellung',
          invalid_password: 'Ungültiger Verschlüsselungsschlüssel',
          key_generation_failed: 'Schlüsselgenerierung fehlgeschlagen',
          parent_directory_retrieve_failed:
            'Elternverzeichnis konnte nicht abgerufen werden',
          plain_text_too_long: 'Zu langer Klartext',
          default: 'Serverfehler',
        },
        success_messages: {
          encryption: 'Verschlüsselung erfolgreich. Datei gespeichert unter',
          decryption: 'Entschlüsselung erfolgreich. Datei gespeichert unter',
          default: 'Erfolg',
        },
        password: {
          min: 'Mindestens 8 Zeichen',
          max: 'Maximal 32 Zeichen',
          uppercase: 'Mindestens ein Großbuchstabe',
          lowercase: 'Mindestens ein Kleinbuchstabe',
          number: 'Mindestens eine Zahl',
          special: 'Mindestens ein Sonderzeichen',
          space: 'Keine Leerzeichen erlaubt',
        },
      },
    },
    it: {
      translation: {
        encryption: {
          encrypt: 'Crittografare',
          decrypt: 'Decifrare',
          select_file: 'Seleziona file',
          password_placeholder: 'Chiave di crittografia',
          reset_message: 'Il modulo di crittografia è stato reimpostato!',
          encrypt_processing: 'Crittografia in corso...',
          decrypt_processing: 'Decrittografia in corso...',
          uploaded: 'File caricato',
          reset: 'Reimposta',
        },
        language: {
          select: 'Seleziona lingua',
          search: 'Cerca lingua',
          empty: 'Lingua non trovata',
        },
        tabs: {
          encryption: 'Crittografia',
          logs: 'Log',
          settings: 'Impostazioni',
        },
        footer: {
          developed_by: 'Sviluppato da',
        },
        logs: {
          timestamp: 'Timestamp',
          message: 'Messaggio',
          no_logs: 'Nessun log disponibile',
        },
        error_messages: {
          decryption_failed: 'Decrittazione fallita',
          encryption_failed: 'Crittografia fallita',
          file_creation_failed: 'Creazione del file fallita',
          file_extension_extraction_failed: 'File non valido',
          file_name_extraction_failed: 'Estrazione del nome del file fallita',
          file_open_failed: 'Impossibile aprire il file',
          file_read_failed: 'Impossibile leggere il file',
          filename_generation_failed: 'Generazione del nome file fallita',
          invalid_password: 'Chiave di crittografia non valida',
          key_generation_failed: 'Generazione chiave fallita',
          parent_directory_retrieve_failed:
            'Impossibile recuperare la directory principale',
          plain_text_too_long: 'Testo in chiaro troppo lungo',
          default: 'Errore del server',
        },
        success_messages: {
          encryption: 'Crittografia riuscita. File salvato in',
          decryption: 'Decrittazione riuscita. File salvato in',
          default: 'Successo',
        },
        password: {
          min: 'min. 8 caratteri',
          max: 'max. 32 caratteri',
          uppercase: 'Almeno una lettera maiuscola',
          lowercase: 'Almeno una lettera minuscola',
          number: 'Almeno un numero',
          special: 'Almeno un carattere speciale',
          space: 'Nessuno spazio consentito',
        },
      },
    },
    fr: {
      translation: {
        encryption: {
          encrypt: 'Chiffrer',
          decrypt: 'Déchiffrer',
          select_file: 'Sélectionner le fichier',
          password_placeholder: 'Clé de chiffrement',
          reset_message: 'Le formulaire de chiffrement a été réinitialisé !',
          encrypt_processing: 'Chiffrement en cours...',
          decrypt_processing: 'Déchiffrement en cours...',
          uploaded: 'Fichier téléchargé',
          reset: 'Réinitialiser',
        },
        language: {
          select: 'Sélectionner la langue',
          search: 'Rechercher la langue',
          empty: 'Aucune langue trouvée',
        },
        tabs: {
          encryption: 'Chiffrement',
          logs: 'Logs',
          settings: 'Paramètres',
        },
        footer: {
          developed_by: 'Développé par',
        },
        logs: {
          timestamp: 'Horodatage',
          message: 'Message',
          no_logs: 'Aucun log disponible',
        },
        error_messages: {
          decryption_failed: 'Déchiffrement échoué',
          encryption_failed: 'Chiffrement échoué',
          file_creation_failed: 'Échec de la création du fichier',
          file_extension_extraction_failed: 'Fichier invalide',
          file_name_extraction_failed:
            "Échec de l'extraction du nom du fichier",
          file_open_failed: "Impossible d'ouvrir le fichier",
          file_read_failed: 'Impossible de lire le fichier',
          filename_generation_failed:
            'Échec de la génération du nom de fichier',
          invalid_password: 'Clé de chiffrement invalide',
          key_generation_failed: 'Échec de la génération de la clé',
          parent_directory_retrieve_failed:
            'Impossible de récupérer le répertoire parent',
          plain_text_too_long: 'Texte brut trop long',
          default: 'Erreur du serveur',
        },
        success_messages: {
          encryption: 'Chiffrement réussi. Fichier enregistré à',
          decryption: 'Déchiffrement réussi. Fichier enregistré à',
          default: 'Succès',
        },
        password: {
          min: 'min. 8 caractères',
          max: 'max. 32 caractères',
          uppercase: 'Au moins une lettre majuscule',
          lowercase: 'Au moins une lettre minuscule',
          number: 'Au moins un chiffre',
          special: 'Au moins un caractère spécial',
          space: "Pas d'espaces autorisés",
        },
      },
    },
    pl: {
      translation: {
        encryption: {
          encrypt: 'Szyfrować',
          decrypt: 'Deszyfrować',
          select_file: 'Wybierz plik',
          password_placeholder: 'Klucz szyfrowania',
          reset_message: 'Formularz szyfrowania został zresetowany!',
          encrypt_processing: 'Szyfrowanie w toku...',
          decrypt_processing: 'Deszyfrowanie w toku...',
          uploaded: 'Plik przesłany',
          reset: 'Zresetuj',
        },
        language: {
          select: 'Wybierz język',
          search: 'Wyszukaj język',
          empty: 'Nie znaleziono języka',
        },
        tabs: {
          encryption: 'Szyfrowanie',
          logs: 'Dzienniki',
          settings: 'Ustawienia',
        },
        footer: {
          developed_by: 'Opracowane przez',
        },
        logs: {
          timestamp: 'Znacznik czasu',
          message: 'Wiadomość',
          no_logs: 'Brak dostępnych dzienników',
        },
        error_messages: {
          decryption_failed: 'Deszyfrowanie nie powiodło się',
          encryption_failed: 'Szyfrowanie nie powiodło się',
          file_creation_failed: 'Nie udało się utworzyć pliku',
          file_extension_extraction_failed: 'Nieprawidłowy plik',
          file_name_extraction_failed: 'Nie udało się wyodrębnić nazwy pliku',
          file_open_failed: 'Nie udało się otworzyć pliku',
          file_read_failed: 'Nie udało się odczytać pliku',
          filename_generation_failed: 'Nie udało się wygenerować nazwy pliku',
          invalid_password: 'Nieprawidłowy klucz szyfrowania',
          key_generation_failed: 'Nie udało się wygenerować klucza',
          parent_directory_retrieve_failed:
            'Nie udało się odzyskać katalogu głównego',
          plain_text_too_long: 'Zbyt długi tekst jawny',
          default: 'Błąd serwera',
        },
        success_messages: {
          encryption: 'Szyfrowanie zakończone sukcesem. Plik zapisano w',
          decryption: 'Deszyfrowanie zakończone sukcesem. Plik zapisano w',
          default: 'Sukces',
        },
        password: {
          min: 'min. 8 znaków',
          max: 'max. 32 znaki',
          uppercase: 'Co najmniej jedna wielka litera',
          lowercase: 'Co najmniej jedna mała litera',
          number: 'Co najmniej jedna liczba',
          special: 'Co najmniej jeden znak specjalny',
          space: 'Brak dozwolonych spacji',
        },
      },
    },
    tr: {
      translation: {
        encryption: {
          encrypt: 'Şifrele',
          decrypt: 'Şifreyi Çöz',
          select_file: 'Dosya Seç',
          password_placeholder: 'Şifreleme anahtarı',
          reset_message: 'Şifreleme formu sıfırlandı!',
          encrypt_processing: 'Şifreleme yapılıyor...',
          decrypt_processing: 'Şifre çözülüyor...',
          uploaded: 'Dosya yüklendi',
          reset: 'Sıfırla',
        },
        language: {
          select: 'Dil Seç',
          search: 'Dil Ara',
          empty: 'Dil bulunamadı',
        },
        tabs: {
          encryption: 'Şifreleme',
          logs: 'Loglar',
          settings: 'Ayarlar',
        },
        footer: {
          developed_by: 'Geliştiren',
        },
        logs: {
          timestamp: 'Zaman Damgası',
          message: 'Mesaj',
          no_logs: 'Log mevcut değil',
        },
        error_messages: {
          decryption_failed: 'Şifre çözme başarısız',
          encryption_failed: 'Şifreleme başarısız',
          file_creation_failed: 'Dosya oluşturulamadı',
          file_extension_extraction_failed: 'Geçersiz dosya',
          file_name_extraction_failed: 'Dosya adı çıkartma başarısız',
          file_open_failed: 'Dosya açılamadı',
          file_read_failed: 'Dosya okunamadı',
          filename_generation_failed: 'Dosya adı oluşturma başarısız',
          invalid_password: 'Geçersiz şifreleme anahtarı',
          key_generation_failed: 'Anahtar oluşturma başarısız',
          parent_directory_retrieve_failed: 'Ana dizin alınamadı',
          plain_text_too_long: 'Metin çok uzun',
          default: 'Sunucu hatası',
        },
        success_messages: {
          encryption: 'Şifreleme başarılı. Dosya şurada kaydedildi',
          decryption: 'Şifre çözme başarılı. Dosya şurada kaydedildi',
          default: 'Başarı',
        },
        password: {
          min: 'min. 8 karakter',
          max: 'max. 32 karakter',
          uppercase: 'En az bir büyük harf',
          lowercase: 'En az bir küçük harf',
          number: 'En az bir rakam',
          special: 'En az bir özel karakter',
          space: 'Boşluklara izin verilmez',
        },
      },
    },
  },
})

export default i18n
