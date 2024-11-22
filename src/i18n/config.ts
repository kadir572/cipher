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
        theme: {
          ui_theme: 'UI Theme',
        },
        donation: {
          dialog_button_label: 'Support Us',
          title: 'Support the Project with a Donation',
          description:
            'Your contribution helps us keep this encryption app free, fast, and secure. Every donation, big or small, makes a difference in keeping privacy a priority.',
          info: 'Your donation will be processed securely through a trusted payment provider. We value your privacy, and all data is handled securely.',
          dialog_submit_button_label: 'Proceed to Payment',
          currency: {
            search: 'Search currency',
            empty: 'No currency found',
            label: 'Donation amount',
            placeholder: 'Enter amount',
          },
        },
        payment: {
          client_secret_error:
            'Please provide a donation amount and select a currency before proceeding to the payment page.',
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
        theme: {
          ui_theme: 'UI-Thema',
        },
        donation: {
          dialog_button_label: 'Unterstützen Sie uns',
          title: 'Unterstützen Sie das Projekt mit einer Spende',
          description:
            'Ihr Beitrag hilft uns, diese Verschlüsselungs-App kostenlos, schnell und sicher zu halten. Jede Spende, ob groß oder klein, macht einen Unterschied, um den Datenschutz zu priorisieren.',
          info: 'Ihre Spende wird sicher über einen vertrauenswürdigen Zahlungsanbieter abgewickelt. Wir schätzen Ihre Privatsphäre, und alle Daten werden sicher behandelt.',
          dialog_submit_button_label: 'Weiter zur Zahlung',
          currency: {
            search: 'Währung suchen',
            empty: 'Keine Währung gefunden',
            label: 'Spendenbetrag',
            placeholder: 'Betrag eingeben',
          },
        },
        payment: {
          client_secret_error:
            'Bitte geben Sie einen Spendenbetrag an und wählen Sie eine Währung aus, bevor Sie zur Zahlungsseite gehen.',
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
        theme: {
          ui_theme: "Tema dell'interfaccia",
        },
        donation: {
          dialog_button_label: 'Sostienici',
          title: 'Sostieni il progetto con una donazione',
          description:
            'Il tuo contributo ci aiuta a mantenere questa app di crittografia gratuita, veloce e sicura. Ogni donazione, grande o piccola, fa la differenza per dare priorità alla privacy.',
          info: 'La tua donazione verrà elaborata in modo sicuro tramite un fornitore di pagamenti fidato. Apprezziamo la tua privacy e tutti i dati vengono gestiti in modo sicuro.',
          dialog_submit_button_label: 'Procedi al pagamento',
          currency: {
            search: 'Cerca valuta',
            empty: 'Nessuna valuta trovata',
            label: 'Importo della donazione',
            placeholder: "Inserisci l'importo",
          },
        },
        payment: {
          client_secret_error:
            'Per favore, inserisci un importo per la donazione e seleziona una valuta prima di procedere alla pagina di pagamento.',
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
        theme: {
          ui_theme: "Thème de l'interface",
        },
        donation: {
          dialog_button_label: 'Soutenez-nous',
          title: 'Soutenez le projet avec un don',
          description:
            'Votre contribution nous aide à garder cette application de cryptage gratuite, rapide et sécurisée. Chaque don, petit ou grand, fait une différence pour donner la priorité à la confidentialité.',
          info: 'Votre don sera traité en toute sécurité via un fournisseur de paiement de confiance. Nous apprécions votre confidentialité et toutes les données sont traitées en toute sécurité.',
          dialog_submit_button_label: 'Procéder au paiement',
          currency: {
            search: 'Rechercher une devise',
            empty: 'Aucune devise trouvée',
            label: 'Montant du don',
            placeholder: 'Saisir le montant',
          },
        },
        payment: {
          client_secret_error:
            'Veuillez fournir un montant de don et sélectionner une devise avant de passer à la page de paiement.',
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
        theme: {
          ui_theme: 'Motyw interfejsu',
        },
        donation: {
          dialog_button_label: 'Wspieraj nas',
          title: 'Wesprzyj projekt darowizną',
          description:
            'Twój wkład pomaga nam utrzymać tę aplikację szyfrowania bezpłatną, szybką i bezpieczną. Każda darowizna, mała lub duża, ma znaczenie, aby priorytetem była prywatność.',
          info: 'Twoja darowizna zostanie przetworzona bezpiecznie za pośrednictwem zaufanego dostawcy płatności. Cenimy Twoją prywatność, a wszystkie dane są przetwarzane w bezpieczny sposób.',
          dialog_submit_button_label: 'Przejdź do płatności',
          currency: {
            search: 'Szukaj waluty',
            empty: 'Nie znaleziono waluty',
            label: 'Kwota darowizny',
            placeholder: 'Wprowadź kwotę',
          },
        },
        payment: {
          client_secret_error:
            'Proszę podać kwotę darowizny i wybrać walutę przed przejściem do strony płatności.',
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
        theme: {
          ui_theme: 'Arayüz Teması',
        },
        donation: {
          dialog_button_label: 'Bizi Destekleyin',
          title: 'Projeyi Bağışla Destekleyin',
          description:
            'Katkınız, bu şifreleme uygulamasını ücretsiz, hızlı ve güvenli tutmamıza yardımcı oluyor. Küçük ya da büyük her bağış, gizliliği öncelikli kılmak için fark yaratır.',
          info: 'Bağışınız güvenilir bir ödeme sağlayıcısı aracılığıyla güvenli bir şekilde işlenecektir. Gizliliğinize değer veriyoruz ve tüm veriler güvenli bir şekilde işleniyor.',
          dialog_submit_button_label: 'Ödemeye Geç',
          currency: {
            search: 'Para birimi ara',
            empty: 'Para birimi bulunamadı',
            label: 'Bağış tutarı',
            placeholder: 'Tutarı girin',
          },
        },
        payment: {
          client_secret_error:
            'Bağış miktarını girin ve ödeme sayfasına devam etmeden önce bir para birimi seçin.',
        },
      },
    },
    ar: {
      translation: {
        encryption: {
          encrypt: 'تشفير',
          decrypt: 'فك التشفير',
          select_file: 'اختيار ملف',
          password_placeholder: 'مفتاح التشفير',
          reset_message: 'تم إعادة تعيين نموذج التشفير!',
          encrypt_processing: 'يتم التشفير...',
          decrypt_processing: 'يتم فك التشفير...',
          uploaded: 'تم رفع الملف',
          reset: 'إعادة تعيين',
        },
        language: {
          select: 'اختيار اللغة',
          search: 'بحث عن لغة',
          empty: 'لا توجد لغة',
        },
        tabs: {
          encryption: 'تشفير',
          logs: 'السجلات',
          settings: 'الإعدادات',
        },
        footer: {
          developed_by: 'تم تطويره بواسطة',
        },
        logs: {
          timestamp: 'الطابع الزمني',
          message: 'الرسالة',
          no_logs: 'لا توجد سجلات',
        },
        error_messages: {
          decryption_failed: 'فشل فك التشفير',
          encryption_failed: 'فشل التشفير',
          file_creation_failed: 'فشل إنشاء الملف',
          file_extension_extraction_failed: 'ملف غير صالح',
          file_name_extraction_failed: 'فشل استخراج اسم الملف',
          file_open_failed: 'تعذر فتح الملف',
          file_read_failed: 'تعذر قراءة الملف',
          filename_generation_failed: 'فشل إنشاء اسم الملف',
          invalid_password: 'مفتاح تشفير غير صالح',
          key_generation_failed: 'فشل إنشاء المفتاح',
          parent_directory_retrieve_failed: 'تعذر استرجاع المجلد الأب',
          plain_text_too_long: 'النص العادي طويل جدًا',
          default: 'خطأ في الخادم',
        },
        success_messages: {
          encryption: 'تم التشفير بنجاح. تم حفظ الملف في',
          decryption: 'تم فك التشفير بنجاح. تم حفظ الملف في',
          default: 'نجاح',
        },
        password: {
          min: '8 أحرف على الأقل',
          max: '32 حرفًا كحد أقصى',
          uppercase: 'على الأقل حرف واحد كبير',
          lowercase: 'على الأقل حرف صغير واحد',
          number: 'على الأقل رقم واحد',
          special: 'على الأقل حرف خاص واحد',
          space: 'لا يُسمح بالمسافات',
        },
        theme: {
          ui_theme: 'سمة واجهة المستخدم',
        },
        donation: {
          dialog_button_label: 'ادعمنا',
          title: 'ادعم المشروع بتبرع',
          description:
            'يساعدنا تبرعك في الحفاظ على هذا التطبيق مشفرًا، مجانيًا، سريعًا وآمنًا. كل تبرع، كبيرًا كان أم صغيرًا، يحدث فرقًا في إعطاء الأولوية للخصوصية.',
          info: 'سيتم معالجة تبرعك بأمان عبر مزود دفع موثوق به. نحن نقدر خصوصيتك، ويتم التعامل مع جميع البيانات بأمان.',
          dialog_submit_button_label: 'المتابعة للدفع',
          currency: {
            search: 'ابحث عن العملة',
            empty: 'لم يتم العثور على عملة',
            label: 'مبلغ التبرع',
            placeholder: 'أدخل المبلغ',
          },
        },
        payment: {
          client_secret_error:
            'يرجى إدخال مبلغ التبرع واختيار العملة قبل المتابعة إلى صفحة الدفع.',
        },
      },
    },

    es: {
      translation: {
        encryption: {
          encrypt: 'Cifrar',
          decrypt: 'Descifrar',
          select_file: 'Seleccionar archivo',
          password_placeholder: 'Clave de cifrado',
          reset_message: '¡El formulario de cifrado ha sido restablecido!',
          encrypt_processing: 'Cifrado...',
          decrypt_processing: 'Descifrado...',
          uploaded: 'Archivo cargado',
          reset: 'Restablecer',
        },
        language: {
          select: 'Seleccionar idioma',
          search: 'Buscar idioma',
          empty: 'Idioma no encontrado',
        },
        tabs: {
          encryption: 'Cifrado',
          logs: 'Registros',
          settings: 'Configuraciones',
        },
        footer: {
          developed_by: 'Desarrollado por',
        },
        logs: {
          timestamp: 'Marca de tiempo',
          message: 'Mensaje',
          no_logs: 'No hay registros disponibles',
        },
        error_messages: {
          decryption_failed: 'Descifrado fallido',
          encryption_failed: 'Cifrado fallido',
          file_creation_failed: 'Creación de archivo fallida',
          file_extension_extraction_failed: 'Archivo inválido',
          file_name_extraction_failed: 'Fallo al extraer el nombre del archivo',
          file_open_failed: 'No se pudo abrir el archivo',
          file_read_failed: 'No se pudo leer el archivo',
          filename_generation_failed: 'Generación de nombre de archivo fallida',
          invalid_password: 'Clave de cifrado inválida',
          key_generation_failed: 'Generación de clave fallida',
          parent_directory_retrieve_failed:
            'No se pudo recuperar el directorio principal',
          plain_text_too_long: 'Texto plano demasiado largo',
          default: 'Error del servidor',
        },
        success_messages: {
          encryption: 'Cifrado exitoso. Archivo guardado en',
          decryption: 'Descifrado exitoso. Archivo guardado en',
          default: 'Éxito',
        },
        password: {
          min: 'mín. 8 caracteres',
          max: 'máx. 32 caracteres',
          uppercase: 'Al menos una letra mayúscula',
          lowercase: 'Al menos una letra minúscula',
          number: 'Al menos un número',
          special: 'Al menos un carácter especial',
          space: 'No se permiten espacios',
        },
        theme: {
          ui_theme: 'Tema de la interfaz',
        },
        donation: {
          dialog_button_label: 'Apóyanos',
          title: 'Apoya el proyecto con una donación',
          description:
            'Tu contribución nos ayuda a mantener esta aplicación de cifrado gratuita, rápida y segura. Cada donación, grande o pequeña, marca la diferencia para priorizar la privacidad.',
          info: 'Tu donación será procesada de manera segura a través de un proveedor de pagos confiable. Valoramos tu privacidad y todos los datos se manejan de manera segura.',
          dialog_submit_button_label: 'Proceder al pago',
          currency: {
            search: 'Buscar moneda',
            empty: 'No se encontró moneda',
            label: 'Cantidad de la donación',
            placeholder: 'Introduzca el importe',
          },
        },
        payment: {
          client_secret_error:
            'Por favor, ingrese un monto de donación y seleccione una moneda antes de proceder a la página de pago.',
        },
      },
    },
    zh: {
      translation: {
        encryption: {
          encrypt: '加密',
          decrypt: '解密',
          select_file: '选择文件',
          password_placeholder: '加密密钥',
          reset_message: '加密表单已重置！',
          encrypt_processing: '加密中...',
          decrypt_processing: '解密中...',
          uploaded: '文件已上传',
          reset: '重置',
        },
        language: {
          select: '选择语言',
          search: '搜索语言',
          empty: '未找到语言',
        },
        tabs: {
          encryption: '加密',
          logs: '日志',
          settings: '设置',
        },
        footer: {
          developed_by: '开发者',
        },
        logs: {
          timestamp: '时间戳',
          message: '信息',
          no_logs: '没有可用的日志',
        },
        error_messages: {
          decryption_failed: '解密失败',
          encryption_failed: '加密失败',
          file_creation_failed: '文件创建失败',
          file_extension_extraction_failed: '文件无效',
          file_name_extraction_failed: '文件名提取失败',
          file_open_failed: '无法打开文件',
          file_read_failed: '无法读取文件',
          filename_generation_failed: '文件名生成失败',
          invalid_password: '无效的加密密钥',
          key_generation_failed: '密钥生成失败',
          parent_directory_retrieve_failed: '无法检索父目录',
          plain_text_too_long: '明文太长',
          default: '服务器错误',
        },
        success_messages: {
          encryption: '加密成功。文件已保存到',
          decryption: '解密成功。文件已保存到',
          default: '成功',
        },
        password: {
          min: '至少8个字符',
          max: '最多32个字符',
          uppercase: '至少一个大写字母',
          lowercase: '至少一个小写字母',
          number: '至少一个数字',
          special: '至少一个特殊字符',
          space: '不允许空格',
        },
        theme: {
          ui_theme: '用户界面主题',
        },
        donation: {
          dialog_button_label: '支持我们',
          title: '通过捐赠支持项目',
          description:
            '您的捐赠帮助我们保持这款加密应用免费、快速和安全。无论捐赠多少，都将有助于优先保护隐私。',
          info: '您的捐赠将通过受信任的支付提供商安全处理。我们重视您的隐私，所有数据均安全处理。',
          dialog_submit_button_label: '继续支付',
          currency: {
            search: '搜索货币',
            empty: '未找到货币',
            label: '捐款金额',
            placeholder: '输入金额',
          },
        },
        payment: {
          client_secret_error: '请提供捐款金额并选择货币，然后再继续支付页面。',
        },
      },
    },

    pt: {
      translation: {
        encryption: {
          encrypt: 'Criptografar',
          decrypt: 'Descriptografar',
          select_file: 'Selecionar arquivo',
          password_placeholder: 'Chave de criptografia',
          reset_message: 'O formulário de criptografia foi resetado!',
          encrypt_processing: 'Criptografando...',
          decrypt_processing: 'Descriptografando...',
          uploaded: 'Arquivo carregado',
          reset: 'Resetar',
        },
        language: {
          select: 'Selecionar idioma',
          search: 'Pesquisar idioma',
          empty: 'Idioma não encontrado',
        },
        tabs: {
          encryption: 'Criptografia',
          logs: 'Registros',
          settings: 'Configurações',
        },
        footer: {
          developed_by: 'Desenvolvido por',
        },
        logs: {
          timestamp: 'Carimbo de data/hora',
          message: 'Mensagem',
          no_logs: 'Sem registros disponíveis',
        },
        error_messages: {
          decryption_failed: 'Falha ao descriptografar',
          encryption_failed: 'Falha ao criptografar',
          file_creation_failed: 'Falha na criação do arquivo',
          file_extension_extraction_failed: 'Arquivo inválido',
          file_name_extraction_failed: 'Falha ao extrair o nome do arquivo',
          file_open_failed: 'Não foi possível abrir o arquivo',
          file_read_failed: 'Não foi possível ler o arquivo',
          filename_generation_failed: 'Falha ao gerar o nome do arquivo',
          invalid_password: 'Chave de criptografia inválida',
          key_generation_failed: 'Falha ao gerar a chave',
          parent_directory_retrieve_failed:
            'Não foi possível recuperar o diretório pai',
          plain_text_too_long: 'Texto simples muito longo',
          default: 'Erro no servidor',
        },
        success_messages: {
          encryption: 'Criptografia bem-sucedida. Arquivo salvo em',
          decryption: 'Descriptografia bem-sucedida. Arquivo salvo em',
          default: 'Sucesso',
        },
        password: {
          min: 'mín. 8 caracteres',
          max: 'máx. 32 caracteres',
          uppercase: 'Pelo menos uma letra maiúscula',
          lowercase: 'Pelo menos uma letra minúscula',
          number: 'Pelo menos um número',
          special: 'Pelo menos um caractere especial',
          space: 'Espaços não são permitidos',
        },
        theme: {
          ui_theme: 'Tema da interface',
        },
        donation: {
          dialog_button_label: 'Apoie-nos',
          title: 'Apoie o projeto com uma doação',
          description:
            'Sua contribuição nos ajuda a manter este aplicativo de criptografia gratuito, rápido e seguro. Toda doação, grande ou pequena, faz a diferença para priorizar a privacidade.',
          info: 'Sua doação será processada com segurança por meio de um provedor de pagamento confiável. Valorizamos sua privacidade e todos os dados são tratados com segurança.',
          dialog_submit_button_label: 'Prosseguir para o pagamento',
          currency: {
            search: 'Pesquisar moeda',
            empty: 'Nenhuma moeda encontrada',
            label: 'Quantia da doação',
            placeholder: 'Digite o valor',
          },
        },
        payment: {
          client_secret_error:
            'Por favor, insira um valor de doação e selecione uma moeda antes de prosseguir para a página de pagamento.',
        },
      },
    },

    ru: {
      translation: {
        encryption: {
          encrypt: 'Шифровать',
          decrypt: 'Дешифровать',
          select_file: 'Выбрать файл',
          password_placeholder: 'Ключ шифрования',
          reset_message: 'Форма шифрования сброшена!',
          encrypt_processing: 'Шифруется...',
          decrypt_processing: 'Дешифруется...',
          uploaded: 'Файл загружен',
          reset: 'Сбросить',
        },
        language: {
          select: 'Выбрать язык',
          search: 'Поиск языка',
          empty: 'Язык не найден',
        },
        tabs: {
          encryption: 'Шифрование',
          logs: 'Журналы',
          settings: 'Настройки',
        },
        footer: {
          developed_by: 'Разработано',
        },
        logs: {
          timestamp: 'Время',
          message: 'Сообщение',
          no_logs: 'Нет доступных журналов',
        },
        error_messages: {
          decryption_failed: 'Не удалось дешифровать',
          encryption_failed: 'Не удалось зашифровать',
          file_creation_failed: 'Не удалось создать файл',
          file_extension_extraction_failed: 'Неверный файл',
          file_name_extraction_failed: 'Не удалось извлечь имя файла',
          file_open_failed: 'Не удалось открыть файл',
          file_read_failed: 'Не удалось прочитать файл',
          filename_generation_failed: 'Не удалось сгенерировать имя файла',
          invalid_password: 'Неверный ключ шифрования',
          key_generation_failed: 'Не удалось сгенерировать ключ',
          parent_directory_retrieve_failed:
            'Не удалось получить родительскую директорию',
          plain_text_too_long: 'Слишком длинный текст',
          default: 'Ошибка на сервере',
        },
        success_messages: {
          encryption: 'Шифрование прошло успешно. Файл сохранен по адресу',
          decryption: 'Дешифровка прошла успешно. Файл сохранен по адресу',
          default: 'Успех',
        },
        password: {
          min: 'мин. 8 символов',
          max: 'макс. 32 символа',
          uppercase: 'Хотя бы одна заглавная буква',
          lowercase: 'Хотя бы одна строчная буква',
          number: 'Хотя бы одна цифра',
          special: 'Хотя бы один специальный символ',
          space: 'Пробелы не допускаются',
        },
        theme: {
          ui_theme: 'Тема интерфейса',
        },
        donation: {
          dialog_button_label: 'Поддержите нас',
          title: 'Поддержите проект пожертвованием',
          description:
            'Ваш вклад помогает нам сохранять это приложение для шифрования бесплатным, быстрым и безопасным. Любое пожертвование, большое или маленькое, имеет значение для приоритета конфиденциальности.',
          info: 'Ваше пожертвование будет обработано надежным платежным провайдером. Мы ценим вашу конфиденциальность, и все данные обрабатываются безопасно.',
          dialog_submit_button_label: 'Перейти к оплате',
          currency: {
            search: 'Искать валюту',
            empty: 'Валюта не найдена',
            label: 'Сумма пожертвования',
            placeholder: 'Введите сумму',
          },
        },
        payment: {
          client_secret_error:
            'Пожалуйста, укажите сумму пожертвования и выберите валюту перед переходом на страницу оплаты.',
        },
      },
    },

    ja: {
      translation: {
        encryption: {
          encrypt: '暗号化',
          decrypt: '復号化',
          select_file: 'ファイルを選択',
          password_placeholder: '暗号化キー',
          reset_message: '暗号化フォームがリセットされました！',
          encrypt_processing: '暗号化中...',
          decrypt_processing: '復号化中...',
          uploaded: 'ファイルがアップロードされました',
          reset: 'リセット',
        },
        language: {
          select: '言語を選択',
          search: '言語を検索',
          empty: '言語が見つかりません',
        },
        tabs: {
          encryption: '暗号化',
          logs: 'ログ',
          settings: '設定',
        },
        footer: {
          developed_by: '開発者',
        },
        logs: {
          timestamp: 'タイムスタンプ',
          message: 'メッセージ',
          no_logs: '利用可能なログはありません',
        },
        error_messages: {
          decryption_failed: '復号化に失敗しました',
          encryption_failed: '暗号化に失敗しました',
          file_creation_failed: 'ファイルの作成に失敗しました',
          file_extension_extraction_failed: '無効なファイル',
          file_name_extraction_failed: 'ファイル名の抽出に失敗しました',
          file_open_failed: 'ファイルを開けませんでした',
          file_read_failed: 'ファイルを読み取れませんでした',
          filename_generation_failed: 'ファイル名の生成に失敗しました',
          invalid_password: '無効な暗号化キー',
          key_generation_failed: 'キーの生成に失敗しました',
          parent_directory_retrieve_failed:
            '親ディレクトリの取得に失敗しました',
          plain_text_too_long: '平文が長すぎます',
          default: 'サーバーエラー',
        },
        success_messages: {
          encryption: '暗号化に成功しました。ファイルは保存されました',
          decryption: '復号化に成功しました。ファイルは保存されました',
          default: '成功',
        },
        password: {
          min: '最小8文字',
          max: '最大32文字',
          uppercase: '少なくとも1つの大文字',
          lowercase: '少なくとも1つの小文字',
          number: '少なくとも1つの数字',
          special: '少なくとも1つの特殊文字',
          space: 'スペースは使用できません',
        },
        theme: {
          ui_theme: 'UIテーマ',
        },
        donation: {
          dialog_button_label: 'サポートする',
          title: '寄付でプロジェクトを支援する',
          description:
            'あなたの寄付は、この暗号化アプリを無料、高速、安全に保つ助けになります。大きな寄付でも小さな寄付でも、プライバシーを優先するために違いを生み出します。',
          info: 'あなたの寄付は、信頼できる決済プロバイダーを通じて安全に処理されます。私たちはあなたのプライバシーを重視し、すべてのデータを安全に取り扱っています。',
          dialog_submit_button_label: '支払いに進む',
          currency: {
            search: '通貨を検索',
            empty: '通貨が見つかりません',
            label: '寄付金額',
            placeholder: '金額を入力',
          },
        },
        payment: {
          client_secret_error:
            '寄付金額を入力し、通貨を選択してから支払いページに進んでください。',
        },
      },
    },

    ko: {
      translation: {
        encryption: {
          encrypt: '암호화',
          decrypt: '복호화',
          select_file: '파일 선택',
          password_placeholder: '암호화 키',
          reset_message: '암호화 양식이 초기화되었습니다!',
          encrypt_processing: '암호화 중...',
          decrypt_processing: '복호화 중...',
          uploaded: '파일 업로드 완료',
          reset: '초기화',
        },
        language: {
          select: '언어 선택',
          search: '언어 검색',
          empty: '언어를 찾을 수 없습니다',
        },
        tabs: {
          encryption: '암호화',
          logs: '로그',
          settings: '설정',
        },
        footer: {
          developed_by: '개발자',
        },
        logs: {
          timestamp: '타임스탬프',
          message: '메시지',
          no_logs: '로그가 없습니다',
        },
        error_messages: {
          decryption_failed: '복호화 실패',
          encryption_failed: '암호화 실패',
          file_creation_failed: '파일 생성 실패',
          file_extension_extraction_failed: '잘못된 파일',
          file_name_extraction_failed: '파일명 추출 실패',
          file_open_failed: '파일을 열 수 없습니다',
          file_read_failed: '파일을 읽을 수 없습니다',
          filename_generation_failed: '파일명 생성 실패',
          invalid_password: '잘못된 암호화 키',
          key_generation_failed: '키 생성 실패',
          parent_directory_retrieve_failed: '상위 디렉터리 검색 실패',
          plain_text_too_long: '텍스트가 너무 깁니다',
          default: '서버 오류',
        },
        success_messages: {
          encryption: '암호화 성공. 파일이 저장되었습니다',
          decryption: '복호화 성공. 파일이 저장되었습니다',
          default: '성공',
        },
        password: {
          min: '최소 8자',
          max: '최대 32자',
          uppercase: '대문자 하나 이상',
          lowercase: '소문자 하나 이상',
          number: '숫자 하나 이상',
          special: '특수문자 하나 이상',
          space: '공백은 허용되지 않습니다',
        },
        theme: {
          ui_theme: 'UI 테마',
        },
        donation: {
          dialog_button_label: '지원하기',
          title: '기부로 프로젝트 지원하기',
          description:
            '귀하의 기부는 이 암호화 앱을 무료, 빠르고 안전하게 유지하는 데 도움이 됩니다. 크든 작든 모든 기부는 프라이버시를 우선시하는 데 큰 차이를 만듭니다.',
          info: '귀하의 기부는 신뢰할 수 있는 결제 제공업체를 통해 안전하게 처리됩니다. 우리는 귀하의 프라이버시를 소중히 여기며 모든 데이터는 안전하게 처리됩니다.',
          dialog_submit_button_label: '결제 진행하기',
          currency: {
            search: '통화 검색',
            empty: '통화를 찾을 수 없음',
            label: '기부 금액',
            placeholder: '금액 입력',
          },
        },
        payment: {
          client_secret_error:
            '기부 금액을 입력하고 결제 페이지로 이동하기 전에 통화를 선택하세요.',
        },
      },
    },

    hi: {
      translation: {
        encryption: {
          encrypt: 'एन्क्रिप्ट',
          decrypt: 'डिक्रिप्ट',
          select_file: 'फाइल चुनें',
          password_placeholder: 'एन्क्रिप्शन कुंजी',
          reset_message: 'एन्क्रिप्शन फॉर्म रीसेट हो गया है!',
          encrypt_processing: 'एन्क्रिप्ट हो रहा है...',
          decrypt_processing: 'डिक्रिप्ट हो रहा है...',
          uploaded: 'फाइल अपलोड हो गई है',
          reset: 'रीसेट',
        },
        language: {
          select: 'भाषा चुनें',
          search: 'भाषा खोजें',
          empty: 'कोई भाषा नहीं मिली',
        },
        tabs: {
          encryption: 'एन्क्रिप्शन',
          logs: 'लॉग्स',
          settings: 'सेटिंग्स',
        },
        footer: {
          developed_by: 'विकसित द्वारा',
        },
        logs: {
          timestamp: 'समय',
          message: 'संदेश',
          no_logs: 'कोई लॉग्स नहीं हैं',
        },
        error_messages: {
          decryption_failed: 'डिक्रिप्शन विफल',
          encryption_failed: 'एन्क्रिप्शन विफल',
          file_creation_failed: 'फाइल निर्माण विफल',
          file_extension_extraction_failed: 'अमान्य फाइल',
          file_name_extraction_failed: 'फाइल नाम निकालने में विफल',
          file_open_failed: 'फाइल खोलने में विफल',
          file_read_failed: 'फाइल पढ़ने में विफल',
          filename_generation_failed: 'फाइल नाम उत्पन्न करने में विफल',
          invalid_password: 'अमान्य एन्क्रिप्शन कुंजी',
          key_generation_failed: 'कुंजी निर्माण विफल',
          parent_directory_retrieve_failed:
            'पैरेंट निर्देशिका प्राप्त करने में विफल',
          plain_text_too_long: 'प्लेनटेक्स्ट बहुत लंबा है',
          default: 'सर्वर त्रुटि',
        },
        success_messages: {
          encryption: 'एन्क्रिप्शन सफल। फाइल को इस स्थान पर सहेजा गया',
          decryption: 'डिक्रिप्शन सफल। फाइल को इस स्थान पर सहेजा गया',
          default: 'सफलता',
        },
        password: {
          min: 'कम से कम 8 वर्ण',
          max: 'अधिकतम 32 वर्ण',
          uppercase: 'कम से कम एक बड़ा अक्षर',
          lowercase: 'कम से कम एक छोटा अक्षर',
          number: 'कम से कम एक अंक',
          special: 'कम से कम एक विशेष चरित्र',
          space: 'स्पेस की अनुमति नहीं है',
        },
        theme: {
          ui_theme: 'यूआई थीम',
        },
        donation: {
          dialog_button_label: 'हमें समर्थन करें',
          title: 'दान के माध्यम से प्रोजेक्ट का समर्थन करें',
          description:
            'आपका योगदान इस एन्क्रिप्शन ऐप को मुफ्त, तेज और सुरक्षित बनाए रखने में हमारी मदद करता है। हर दान, चाहे बड़ा हो या छोटा, गोपनीयता को प्राथमिकता देने में मदद करता है।',
          info: 'आपका दान एक विश्वसनीय भुगतान प्रदाता के माध्यम से सुरक्षित रूप से संसाधित किया जाएगा। हम आपकी गोपनीयता का महत्व समझते हैं, और सभी डेटा को सुरक्षित रूप से प्रबंधित किया जाता है।',
          dialog_submit_button_label: 'भुगतान पर जाएं',
          currency: {
            search: 'मुद्रा खोजें',
            empty: 'कोई मुद्रा नहीं मिली',
            label: 'दान राशि',
            placeholder: 'राशि दर्ज करें',
          },
        },
        payment: {
          client_secret_error:
            'कृपया दान की राशि दर्ज करें और भुगतान पृष्ठ पर जाने से पहले एक मुद्रा का चयन करें।',
        },
      },
    },
  },
})

export default i18n
