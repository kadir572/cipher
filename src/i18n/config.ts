import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        nav: {
          tabs: {
            encryptionDecryption: 'Encryption | Decryption',
            decryption: 'Decryption',
            logs: 'Logs',
            settings: 'Settings',
          },
        },
        common: {
          actions: {
            reset: 'Reset',
            cancel: 'Cancel',
            proceed: 'Proceed',
            download: 'Download',
            delete: 'Delete',
            confirm: 'Confirm',
          },
          status: {
            success: 'Success',
            error: 'Error',
          },
        },
        encryption: {
          form: {
            encrypt: 'Encrypt',
            decrypt: 'Decrypt',
            selectFiles: 'Select file(s)',
            encryptionKey: 'Encryption key',
            resetMessage: 'Encryption form has been reset!',
            deleteOriginal: {
              label: 'Delete original',
              title: 'Are you sure you want to delete the original files?',
              description:
                'This action cannot be undone and will permanently delete the original files after encryption/decryption.',
              selectFilesWarning: 'Please select files first',
            },
          },
          progress: {
            encrypting: 'Encrypting...',
            decrypting: 'Decrypting...',
            filesUploaded: 'File(s) uploaded',
            fileSavedAt: 'File saved at',
            totalSize: 'Total size',
            timeTaken: 'Time taken',
            averageSpeed: 'Average speed',
            progress: 'Progress',
            speed: 'Speed',
            eta: 'ETA',
            processed: 'Processed',
            details: 'Details',
            originalFile: 'Original file',
            location: 'Location',
          },
          validation: {
            mixedFileTypes:
              'Files are mixed. All should either have .enc or none.',
            password: {
              minLength: 'Min. 8 characters',
              maxLength: 'Max. 32 characters',
              uppercase: 'At least one uppercase',
              lowercase: 'At least one lowercase',
              number: 'At least one number',
              special: 'At least one special character',
              space: 'No spaces allowed',
            },
          },
          responseTextCodes: {
            encryption_successful: 'Encryption successful',
            decryption_successful: 'Decryption successful',
            encryption_failed: 'Encryption failed',
            decryption_failed: 'Decryption failed',
            file_open_failed: "Couldn't open file",
            file_read_failed: "Couldn't read file",
            file_creation_failed: 'File creation failed',
            key_generation_failed: 'Key generation failed',
            invalid_password: 'Invalid password',
            db_conn_failed: 'Database connection failed',
            parent_directory_retrieve_failed:
              "Couldn't retrieve parent directory",
            file_name_extraction_failed: 'File name extraction failed',
            file_extension_extraction_failed: 'File invalid',
            file_creation_successful: 'File creation successful',
            logs_downloaded: 'Logs downloaded',
            file_delete_failed: 'Failed to delete original file',
          },
        },
        logs: {
          headers: {
            timestamp: 'Timestamp',
            level: 'Level',
            message: 'Message',
          },
          status: {
            empty: 'No logs available',
            downloadSuccess: 'Logs have been downloaded successfully',
            downloadError: 'Failed to download logs',
            deleted: 'Logs have been deleted',
            fetchError: 'Failed to fetch logs',
          },
          dialog: {
            title: 'Are you sure you want to delete the logs?',
            description:
              'This action cannot be undone and will permanently delete all logs.',
          },
        },
        settings: {
          theme: {
            label: 'UI Theme',
          },
          language: {
            label: 'Language',
            select: 'Select language',
            search: 'Search language',
            empty: 'No language found',
          },
        },
        donation: {
          dialog: {
            title: 'Support the Project with a Donation',
            description:
              'Your contribution helps us keep this encryption app free, fast, and secure. Every donation, big or small, makes a difference in keeping privacy a priority.',
            info: 'Your donation will be processed securely through a trusted payment provider. We value your privacy, and all data is handled securely.',
            openButton: 'Support Us',
            buttonLabel: 'Proceed to Payment',
          },
          form: {
            amount: {
              label: 'Donation amount',
              placeholder: 'Enter amount',
            },
            currency: {
              label: 'Select currency',
              search: 'Search currency',
              noResult: 'No currency found',
            },
          },
          validation: {
            minAmount: 'Donation amount should be at least 1.',
            invalidAmount: 'Donation amount must be of type number',
            missingInfo:
              'Please provide a donation amount and select a currency before proceeding to the payment page.',
          },
        },
        footer: {
          credits: 'Developed by',
        },
      },
    },
    de: {
      translation: {
        nav: {
          tabs: {
            encryptionDecryption: 'Verschlüsselung | Entschlüsselung',
            decryption: 'Entschlüsselung',
            logs: 'Logs',
            settings: 'Einstellungen',
          },
        },
        common: {
          actions: {
            reset: 'Zurücksetzen',
            cancel: 'Abbrechen',
            proceed: 'Fortfahren',
            download: 'Herunterladen',
            delete: 'Löschen',
            confirm: 'Bestätigen',
          },
          status: {
            success: 'Erfolg',
            error: 'Fehler',
          },
        },
        encryption: {
          form: {
            encrypt: 'Verschlüsseln',
            decrypt: 'Entschlüsseln',
            selectFiles: 'Datei(en) auswählen',
            encryptionKey: 'Verschlüsselungsschlüssel',
            resetMessage: 'Verschlüsselungsformular wurde zurückgesetzt!',
            deleteOriginal: {
              label: 'Original löschen',
              title:
                'Sind Sie sicher, dass Sie die Originaldateien löschen möchten?',
              description:
                'Diese Aktion kann nicht rückgängig gemacht werden und löscht die Originaldateien permanent nach der Verschlüsselung/Entschlüsselung.',
              selectFilesWarning: 'Bitte wählen Sie zuerst Dateien aus',
            },
          },
          progress: {
            encrypting: 'Verschlüssele...',
            decrypting: 'Entschlüssele...',
            filesUploaded: 'Datei(en) hochgeladen',
            fileSavedAt: 'Datei gespeichert unter',
            totalSize: 'Gesamtgröße',
            timeTaken: 'Benötigte Zeit',
            averageSpeed: 'Durchschnittliche Geschwindigkeit',
            progress: 'Fortschritt',
            speed: 'Geschwindigkeit',
            eta: 'Geschätzte Zeit',
            processed: 'Verarbeitet',
            details: 'Details',
            originalFile: 'Originaldatei',
            location: 'Speicherort',
          },
          validation: {
            mixedFileTypes:
              'Dateien sind gemischt. Alle sollten entweder .enc haben oder keine.',
            password: {
              minLength: 'Min. 8 Zeichen',
              maxLength: 'Max. 32 Zeichen',
              uppercase: 'Mindestens ein Großbuchstabe',
              lowercase: 'Mindestens ein Kleinbuchstabe',
              number: 'Mindestens eine Zahl',
              special: 'Mindestens ein Sonderzeichen',
              space: 'Keine Leerzeichen erlaubt',
            },
          },
          responseTextCodes: {
            encryption_successful: 'Verschlüsselung erfolgreich',
            decryption_successful: 'Entschlüsselung erfolgreich',
            encryption_failed: 'Verschlüsselung fehlgeschlagen',
            decryption_failed: 'Entschlüsselung fehlgeschlagen',
            file_open_failed: 'Datei konnte nicht geöffnet werden',
            file_read_failed: 'Datei konnte nicht gelesen werden',
            file_creation_failed: 'Dateierstellung fehlgeschlagen',
            key_generation_failed: 'Schl��sselgenerierung fehlgeschlagen',
            invalid_password: 'Ungültiges Passwort',
            db_conn_failed: 'Datenbankverbindung fehlgeschlagen',
            parent_directory_retrieve_failed:
              'Übergeordnetes Verzeichnis konnte nicht abgerufen werden',
            file_name_extraction_failed: 'Dateinamensextraktion fehlgeschlagen',
            file_extension_extraction_failed: 'Datei ungültig',
            file_creation_successful: 'Dateierstellung erfolgreich',
            logs_downloaded: 'Logs heruntergeladen',
            file_delete_failed: 'Failed to delete original file',
          },
        },
        logs: {
          headers: {
            timestamp: 'Zeitstempel',
            level: 'Level',
            message: 'Nachricht',
          },
          status: {
            empty: 'Keine Logs verfügbar',
            downloadSuccess: 'Logs wurden erfolgreich heruntergeladen',
            downloadError: 'Logs konnten nicht heruntergeladen werden',
            deleted: 'Logs wurden gelöscht',
            fetchError: 'Logs konnten nicht abgerufen werden',
          },
          dialog: {
            title: 'Möchten Sie die Logs wirklich löschen?',
            description:
              'Diese Aktion kann nicht rückgängig gemacht werden und löscht alle Logs permanent.',
          },
        },
        settings: {
          theme: {
            label: 'Theme',
          },
          language: {
            label: 'Sprache',
            select: 'Sprache auswählen',
            search: 'Sprache suchen',
            empty: 'Keine Sprache gefunden',
          },
        },
        donation: {
          dialog: {
            title: 'Unterstützen Sie das Projekt mit einer Spende',
            description:
              'Ihr Beitrag hilft uns, diese Verschlüsselungs-App kostenlos, schnell und sicher zu halten. Jede Spende macht einen Unterschied.',
            info: 'Ihre Spende wird sicher über einen vertrauenswürdigen Zahlungsanbieter verarbeitet. Wir schätzen Ihre Privatsphäre.',
            openButton: 'Jetzt unterstützen',
            buttonLabel: 'Zur Zahlung',
          },
          form: {
            amount: {
              label: 'Spendenbetrag',
              placeholder: 'Betrag eingeben',
            },
            currency: {
              label: 'Währung wählen',
              search: 'Währung suchen',
              noResult: 'Keine Währung gefunden',
            },
          },
          validation: {
            minAmount: 'Spendenbetrag muss mindestens 1 sein',
            invalidAmount: 'Spendenbetrag muss eine Zahl sein',
            missingInfo:
              'Bitte Spendenbetrag und Währung vor dem Fortfahren auswählen',
          },
        },
        footer: {
          credits: 'Entwickelt von',
        },
      },
    },
    fr: {
      translation: {
        nav: {
          tabs: {
            encryptionDecryption: 'Chiffrement | Déchiffrement',
            decryption: 'Déchiffrement',
            logs: 'Logs',
            settings: 'Paramètres',
          },
        },
        common: {
          actions: {
            reset: 'Réinitialiser',
            cancel: 'Annuler',
            proceed: 'Continuer',
            download: 'Télécharger',
            delete: 'Supprimer',
            confirm: 'Confirmer',
          },
          status: {
            success: 'Succès',
            error: 'Erreur',
          },
        },
        encryption: {
          form: {
            encrypt: 'Chiffrer',
            decrypt: 'Déchiffrer',
            selectFiles: 'Sélectionner fichier(s)',
            encryptionKey: 'Clé de chiffrement',
            resetMessage: 'Le formulaire de chiffrement a été réinitialisé !',
            deleteOriginal: {
              label: "Supprimer l'original",
              title:
                'Êtes-vous sûr de vouloir supprimer les fichiers originaux?',
              description:
                'Cette action ne peut pas être annulée et supprimera définitivement les fichiers originaux après le chiffrement/déchiffrement.',
              selectFilesWarning: "Veuillez d'abord sélectionner des fichiers",
            },
          },
          progress: {
            encrypting: 'Chiffrement en cours...',
            decrypting: 'Déchiffrement en cours...',
            filesUploaded: 'Fichier(s) téléchargé(s)',
            fileSavedAt: 'Fichier enregistré à',
            totalSize: 'Taille totale',
            timeTaken: 'Temps écoulé',
            averageSpeed: 'Vitesse moyenne',
            progress: 'Progression',
            speed: 'Vitesse',
            eta: 'Temps estimé',
            processed: 'Traité',
            details: 'Détails',
            originalFile: 'Fichier original',
            location: 'Emplacement',
          },
          validation: {
            mixedFileTypes:
              'Les fichiers sont mélangés. Tous doivent avoir .enc ou aucun.',
            password: {
              minLength: 'Min. 8 caractères',
              maxLength: 'Max. 32 caractères',
              uppercase: 'Au moins une majuscule',
              lowercase: 'Au moins une minuscule',
              number: 'Au moins un chiffre',
              special: 'Au moins un caractère spécial',
              space: "Pas d'espaces autorisés",
            },
          },
          responseTextCodes: {
            encryption_successful: 'Chiffrement réussi',
            decryption_successful: 'Déchiffrement réussi',
            encryption_failed: 'Échec du chiffrement',
            decryption_failed: 'Échec du déchiffrement',
            file_open_failed: "Impossible d'ouvrir le fichier",
            file_read_failed: 'Impossible de lire le fichier',
            file_creation_failed: 'Échec de la création du fichier',
            key_generation_failed: 'Échec de la génération de la clé',
            invalid_password: 'Mot de passe invalide',
            db_conn_failed: 'Échec de la connexion à la base de données',
            parent_directory_retrieve_failed:
              'Impossible de récupérer le répertoire parent',
            file_name_extraction_failed:
              "Échec de l'extraction du nom de fichier",
            file_extension_extraction_failed: 'Fichier invalide',
            file_creation_successful: 'Création du fichier réussie',
            logs_downloaded: 'Logs téléchargés',
            file_delete_failed: 'Failed to delete original file',
          },
        },
        logs: {
          headers: {
            timestamp: 'Horodatage',
            level: 'Niveau',
            message: 'Message',
          },
          status: {
            empty: 'Aucun log disponible',
            downloadSuccess: 'Les logs ont été téléchargés avec succès',
            downloadError: 'Échec du téléchargement des logs',
            deleted: 'Les logs ont été supprimés',
            fetchError: 'Impossible de récupérer les logs',
          },
          dialog: {
            title: 'Êtes-vous sûr de vouloir supprimer les logs ?',
            description:
              'Cette action ne peut pas être annulée et supprimera définitivement tous les logs.',
          },
        },
        settings: {
          theme: {
            label: 'Thème',
          },
          language: {
            label: 'Langue',
            select: 'Sélectionner la langue',
            search: 'Rechercher une langue',
            empty: 'Aucune langue trouvée',
          },
        },
        donation: {
          dialog: {
            title: 'Soutenez le Projet avec un Don',
            description:
              'Votre contribution nous aide à maintenir cette application de chiffrement gratuite, rapide et s��curisée. Chaque don fait la différence.',
            info: 'Votre don sera traité en toute sécurité via un prestataire de paiement de confiance. Nous respectons votre confidentialité.',
            openButton: 'Nous Soutenir',
            buttonLabel: 'Procéder au Paiement',
          },
          form: {
            amount: {
              label: 'Montant du don',
              placeholder: 'Saisir le montant',
            },
            currency: {
              label: 'Sélectionner la devise',
              search: 'Rechercher une devise',
              noResult: 'Aucune devise trouvée',
            },
          },
          validation: {
            minAmount: "Le montant du don doit être d'au moins 1",
            invalidAmount: 'Le montant du don doit être un nombre',
            missingInfo:
              'Veuillez indiquer un montant et sélectionner une devise avant de continuer',
          },
        },
        footer: {
          credits: 'Développé par',
        },
      },
    },
    it: {
      translation: {
        nav: {
          tabs: {
            encryptionDecryption: 'Crittografia | Decrittografia',
            decryption: 'Decrittografia',
            logs: 'Logs',
            settings: 'Impostazioni',
          },
        },
        common: {
          actions: {
            reset: 'Ripristina',
            cancel: 'Annulla',
            proceed: 'Procedi',
            download: 'Scarica',
            delete: 'Elimina',
            confirm: 'Conferma',
          },
          status: {
            success: 'Successo',
            error: 'Errore',
          },
        },
        encryption: {
          form: {
            encrypt: 'Cripta',
            decrypt: 'Decripta',
            selectFiles: 'Seleziona file',
            encryptionKey: 'Chiave di crittografia',
            resetMessage: 'Il modulo di crittografia è stato reimpostato!',
            deleteOriginal: {
              label: 'Elimina originale',
              title: 'Sei sicuro di voler eliminare i file originali?',
              description:
                'Questa azione non può essere annullata ed eliminerà permanentemente i file originali dopo la crittografia/decrittografia.',
              selectFilesWarning: 'Seleziona prima i file',
            },
          },
          progress: {
            encrypting: 'Crittografia in corso...',
            decrypting: 'Decrittografia in corso...',
            filesUploaded: 'File caricati',
            fileSavedAt: 'File salvato in',
            totalSize: 'Dimensione totale',
            timeTaken: 'Tempo impiegato',
            averageSpeed: 'Velocità media',
            progress: 'Progresso',
            speed: 'Velocità',
            eta: 'Tempo stimato',
            processed: 'Elaborato',
            details: 'Dettagli',
            originalFile: 'File originale',
            location: 'Posizione',
          },
          validation: {
            mixedFileTypes:
              'I file sono misti. Tutti devono avere .enc o nessuno.',
            password: {
              minLength: 'Min. 8 caratteri',
              maxLength: 'Max. 32 caratteri',
              uppercase: 'Almeno una maiuscola',
              lowercase: 'Almeno una minuscola',
              number: 'Almeno un numero',
              special: 'Almeno un carattere speciale',
              space: 'Nessuno spazio consentito',
            },
          },
          responseTextCodes: {
            encryption_successful: 'Crittografia riuscita',
            decryption_successful: 'Decrittografia riuscita',
            encryption_failed: 'Crittografia fallita',
            decryption_failed: 'Decrittografia fallita',
            file_open_failed: 'Impossibile aprire il file',
            file_read_failed: 'Impossibile leggere il file',
            file_creation_failed: 'Creazione file fallita',
            key_generation_failed: 'Generazione chiave fallita',
            invalid_password: 'Password non valida',
            db_conn_failed: 'Connessione al database fallita',
            parent_directory_retrieve_failed:
              'Impossibile recuperare la directory principale',
            file_name_extraction_failed: 'Estrazione nome file fallita',
            file_extension_extraction_failed: 'File non valido',
            file_creation_successful: 'Creazione file riuscita',
            logs_downloaded: 'Logs scaricati',
            file_delete_failed: 'Failed to delete original file',
          },
        },
        logs: {
          headers: {
            timestamp: 'Data e ora',
            level: 'Livello',
            message: 'Messaggio',
          },
          status: {
            empty: 'Nessun log disponibile',
            downloadSuccess: 'Logs scaricati con successo',
            downloadError: 'Download dei logs fallito',
            deleted: 'Logs eliminati',
            fetchError: 'Impossibile recuperare i logs',
          },
          dialog: {
            title: 'Sei sicuro di voler eliminare i logs?',
            description:
              'Questa azione non può essere annullata ed eliminerà permanentemente tutti i logs.',
          },
        },
        settings: {
          theme: {
            label: 'Tema',
          },
          language: {
            label: 'Lingua',
            select: 'Seleziona lingua',
            search: 'Cerca lingua',
            empty: 'Nessuna lingua trovata',
          },
        },
        donation: {
          dialog: {
            title: 'Sostieni il Progetto con una Donazione',
            description:
              'Il tuo contributo ci aiuta a mantenere questa app di crittografia gratuita, veloce e sicura. Ogni donazione fa la differenza.',
            info: 'La tua donazione sarà elaborata in modo sicuro tramite un fornitore di pagamenti affidabile. Rispettiamo la tua privacy.',
            openButton: 'Sostienici',
            buttonLabel: 'Procedi al Pagamento',
          },
          form: {
            amount: {
              label: 'Importo donazione',
              placeholder: 'Inserisci importo',
            },
            currency: {
              label: 'Seleziona valuta',
              search: 'Cerca valuta',
              noResult: 'Nessuna valuta trovata',
            },
          },
          validation: {
            minAmount: "L'importo della donazione deve essere almeno 1",
            invalidAmount: "L'importo della donazione deve essere un numero",
            missingInfo:
              'Inserisci un importo e seleziona una valuta prima di procedere',
          },
        },
        footer: {
          credits: 'Sviluppato da',
        },
      },
    },
    es: {
      translation: {
        nav: {
          tabs: {
            encryptionDecryption: 'Cifrado | Descifrado',
            decryption: 'Descifrado',
            logs: 'Logs',
            settings: 'Configuración',
          },
        },
        common: {
          actions: {
            reset: 'Restablecer',
            cancel: 'Cancelar',
            proceed: 'Continuar',
            download: 'Descargar',
            delete: 'Eliminar',
            confirm: 'Confirmar',
          },
          status: {
            success: 'Éxito',
            error: 'Error',
          },
        },
        encryption: {
          form: {
            encrypt: 'Cifrar',
            decrypt: 'Descifrar',
            selectFiles: 'Seleccionar archivo(s)',
            encryptionKey: 'Clave de cifrado',
            resetMessage: '¡El formulario de cifrado ha sido restablecido!',
            deleteOriginal: {
              label: 'Eliminar original',
              title:
                '¿Está seguro de que desea eliminar los archivos originales?',
              description:
                'Esta acción no se puede deshacer y eliminará permanentemente los archivos originales después del cifrado/descifrado.',
              selectFilesWarning: 'Por favor, seleccione archivos primero',
            },
          },
          progress: {
            encrypting: 'Cifrando...',
            decrypting: 'Descifrando...',
            filesUploaded: 'Archivo(s) subido(s)',
            fileSavedAt: 'Archivo guardado en',
            totalSize: 'Tamaño total',
            timeTaken: 'Tiempo empleado',
            averageSpeed: 'Velocidad promedio',
            progress: 'Progreso',
            speed: 'Velocidad',
            eta: 'Tiempo estimado',
            processed: 'Procesado',
            details: 'Detalles',
            originalFile: 'Archivo original',
            location: 'Ubicación',
          },
          validation: {
            mixedFileTypes:
              'Los archivos están mezclados. Todos deben tener .enc o ninguno.',
            password: {
              minLength: 'Mín. 8 caracteres',
              maxLength: 'Máx. 32 caracteres',
              uppercase: 'Al menos una mayúscula',
              lowercase: 'Al menos una minúscula',
              number: 'Al menos un número',
              special: 'Al menos un carácter especial',
              space: 'No se permiten espacios',
            },
          },
          responseTextCodes: {
            encryption_successful: 'Cifrado exitoso',
            decryption_successful: 'Descifrado exitoso',
            encryption_failed: 'Cifrado fallido',
            decryption_failed: 'Descifrado fallido',
            file_open_failed: 'No se pudo abrir el archivo',
            file_read_failed: 'No se pudo leer el archivo',
            file_creation_failed: 'Error al crear el archivo',
            key_generation_failed: 'Error en la generación de la clave',
            invalid_password: 'Contraseña inválida',
            db_conn_failed: 'Error de conexión a la base de datos',
            parent_directory_retrieve_failed:
              'No se pudo recuperar el directorio principal',
            file_name_extraction_failed:
              'Error al extraer el nombre del archivo',
            file_extension_extraction_failed: 'Archivo inválido',
            file_creation_successful: 'Archivo creado exitosamente',
            logs_downloaded: 'Logs descargados',
            file_delete_failed: 'Failed to delete original file',
          },
        },
        logs: {
          headers: {
            timestamp: 'Fecha y hora',
            level: 'Nivel',
            message: 'Mensaje',
          },
          status: {
            empty: 'No hay logs disponibles',
            downloadSuccess: 'Logs descargados exitosamente',
            downloadError: 'Error al descargar los logs',
            deleted: 'Logs eliminados',
            fetchError: 'Error al obtener los logs',
          },
          dialog: {
            title: '¿Está seguro de que desea eliminar los logs?',
            description:
              'Esta acción no se puede deshacer y eliminará permanentemente todos los logs.',
          },
        },
        settings: {
          theme: {
            label: 'Tema',
          },
          language: {
            label: 'Idioma',
            select: 'Seleccionar idioma',
            search: 'Buscar idioma',
            empty: 'No se encontró ningún idioma',
          },
        },
        donation: {
          dialog: {
            title: 'Apoye el Proyecto con una Donación',
            description:
              'Su contribución nos ayuda a mantener esta aplicación de cifrado gratuita, rápida y segura. Cada donación marca la diferencia.',
            info: 'Su donaci��n será procesada de forma segura a través de un proveedor de pagos confiable. Valoramos su privacidad.',
            openButton: 'Apóyenos',
            buttonLabel: 'Proceder al Pago',
          },
          form: {
            amount: {
              label: 'Monto de la donación',
              placeholder: 'Ingrese el monto',
            },
            currency: {
              label: 'Seleccionar moneda',
              search: 'Buscar moneda',
              noResult: 'No se encontró ninguna moneda',
            },
          },
          validation: {
            minAmount: 'El monto de la donación debe ser al menos 1',
            invalidAmount: 'El monto de la donación debe ser un número',
            missingInfo:
              'Por favor ingrese un monto y seleccione una moneda antes de continuar',
          },
        },
        footer: {
          credits: 'Desarrollado por',
        },
      },
    },
    tr: {
      translation: {
        nav: {
          tabs: {
            encryptionDecryption: 'Şifreleme | Şifre Çözme',
            decryption: 'Şifre Çözme',
            logs: 'Loglar',
            settings: 'Ayarlar',
          },
        },
        common: {
          actions: {
            reset: 'Sıfırla',
            cancel: 'İptal',
            proceed: 'Devam Et',
            download: 'İndir',
            delete: 'Sil',
            confirm: 'Onayla',
          },
          status: {
            success: 'Başarılı',
            error: 'Hata',
          },
        },
        encryption: {
          form: {
            encrypt: 'Şifrele',
            decrypt: 'Şifre Çöz',
            selectFiles: 'Dosya(ları) Seç',
            encryptionKey: 'Şifreleme Anahtarı',
            resetMessage: 'Şifreleme formu sıfırlandı!',
            deleteOriginal: {
              label: 'Orijinali sil',
              title: 'Orijinal dosyaları silmek istediğinizden emin misiniz?',
              description:
                'Bu işlem geri alınamaz ve şifreleme/şifre çözme işleminden sonra orijinal dosyaları kalıcı olarak silecektir.',
              selectFilesWarning: 'Lütfen önce dosyaları seçin',
            },
          },
          progress: {
            encrypting: 'Şifreleniyor...',
            decrypting: 'Şifre Çözülüyor...',
            filesUploaded: 'Dosya(lar) Yüklendi',
            fileSavedAt: 'Dosya Kaydedildi',
            totalSize: 'Toplam Boyut',
            timeTaken: 'Geçen Süre',
            averageSpeed: 'Ortalama Hız',
            progress: 'İlerleme',
            speed: 'Hız',
            eta: 'Tahmini Süre',
            processed: 'İşlendi',
            details: 'Detaylar',
            originalFile: 'Orijinal Dosya',
            location: 'Konum',
          },
          validation: {
            mixedFileTypes:
              'Dosyalar karışık. Hepsinin .enc uzantısı olmalı ya da hiçbirinin olmamalı.',
            password: {
              minLength: 'Min. 8 karakter',
              maxLength: 'Maks. 32 karakter',
              uppercase: 'En az bir büyük harf',
              lowercase: 'En az bir küçük harf',
              number: 'En az bir rakam',
              special: 'En az bir özel karakter',
              space: 'Boşluk kullanılamaz',
            },
          },
          responseTextCodes: {
            encryption_successful: 'Şifreleme başarılı',
            decryption_successful: 'Şifre çözme başarılı',
            encryption_failed: 'Şifreleme başarısız',
            decryption_failed: 'Şifre çözme başarısız',
            file_open_failed: 'Dosya açılamadı',
            file_read_failed: 'Dosya okunamadı',
            file_creation_failed: 'Dosya oluşturulamadı',
            key_generation_failed: 'Anahtar oluşturma başarısız',
            invalid_password: 'Geçersiz şifre',
            db_conn_failed: 'Veritabanı bağlantısı başarısız',
            parent_directory_retrieve_failed: 'Üst dizin alınamadı',
            file_name_extraction_failed: 'Dosya adı çıkarılamadı',
            file_extension_extraction_failed: 'Geçersiz dosya',
            file_creation_successful: 'Dosya oluşturma başarılı',
            logs_downloaded: 'Loglar indirildi',
            file_delete_failed: 'Failed to delete original file',
          },
        },
        logs: {
          headers: {
            timestamp: 'Zaman Damgası',
            level: 'Seviye',
            message: 'Mesaj',
          },
          status: {
            empty: 'Log kaydı yok',
            downloadSuccess: 'Loglar başarıyla indirildi',
            downloadError: 'Loglar indirilemedi',
            deleted: 'Loglar silindi',
            fetchError: 'Loglar alınamadı',
          },
          dialog: {
            title: 'Logları silmek istediğinizden emin misiniz?',
            description:
              'Bu işlem geri alınamaz ve tüm logları kalıcı olarak silecektir.',
          },
        },
        settings: {
          theme: {
            label: 'Tema',
          },
          language: {
            label: 'Dil',
            select: 'Dil seç',
            search: 'Dil ara',
            empty: 'Dil bulunamadı',
          },
        },
        donation: {
          dialog: {
            title: 'Projeyi Bağışla Destekleyin',
            description:
              'Katkınız bu şifreleme uygulamasını ücretsiz, hızlı ve güvenli tutmamıza yardımcı oluyor. Her bağış fark yaratır.',
            info: 'Bağışınız güvenilir bir ödeme sağlayıcısı aracılığıyla güvenle işlenecektir. Gizliliğinize değer veriyoruz.',
            openButton: 'Destekle',
            buttonLabel: 'Ödemeye Geç',
          },
          form: {
            amount: {
              label: 'Bağış miktarı',
              placeholder: 'Miktar girin',
            },
            currency: {
              label: 'Para birimi seç',
              search: 'Para birimi ara',
              noResult: 'Nessuna valuta trovata',
            },
          },
          validation: {
            minAmount: 'Bağış miktarı en az 1 olmalıdır',
            invalidAmount: 'Bağış miktarı bir sayı olmalıdır',
            missingInfo:
              'Lütfen devam etmeden önce bir miktar girin ve para birimi seçin',
          },
        },
        footer: {
          credits: 'Geliştiren',
        },
      },
    },
    pl: {
      translation: {
        nav: {
          tabs: {
            encryptionDecryption: 'Szyfrowanie | Deszyfrowanie',
            decryption: 'Deszyfrowanie',
            logs: 'Logi',
            settings: 'Ustawienia',
          },
        },
        common: {
          actions: {
            reset: 'Resetuj',
            cancel: 'Anuluj',
            proceed: 'Kontynuuj',
            download: 'Pobierz',
            delete: 'Usuń',
            confirm: 'Potwierdź',
          },
          status: {
            success: 'Sukces',
            error: 'Błąd',
          },
        },
        encryption: {
          form: {
            encrypt: 'Szyfruj',
            decrypt: 'Deszyfruj',
            selectFiles: 'Wybierz plik(i)',
            encryptionKey: 'Klucz szyfrowania',
            resetMessage: 'Formularz szyfrowania został zresetowany!',
            deleteOriginal: {
              label: 'Elimina originale',
              title: 'Czy na pewno chcesz usunąć oryginalne pliki?',
              description:
                'Ta akcja jest nieodwracalna i trwale usunie oryginalne pliki po szyfrowaniu/deszyfrowaniu.',
              selectFilesWarning: 'Proszę najpierw wybrać pliki',
            },
          },
          progress: {
            encrypting: 'Szyfrowanie...',
            decrypting: 'Deszyfrowanie...',
            filesUploaded: 'Przesłano plik(i)',
            fileSavedAt: 'Plik zapisany w',
            totalSize: 'Całkowity rozmiar',
            timeTaken: 'Czas wykonania',
            averageSpeed: 'Średnia prędkość',
            progress: 'Postęp',
            speed: 'Prędkość',
            eta: 'Szacowany czas',
            processed: 'Przetworzono',
            details: 'Szczegóły',
            originalFile: 'Oryginalny plik',
            location: 'Lokalizacja',
          },
          validation: {
            mixedFileTypes:
              'Pliki są pomieszane. Wszystkie powinny mieć rozszerzenie .enc lub żaden.',
            password: {
              minLength: 'Min. 8 znaków',
              maxLength: 'Maks. 32 znaki',
              uppercase: 'Przynajmniej jedna wielka litera',
              lowercase: 'Przynajmniej jedna mała litera',
              number: 'Przynajmniej jedna cyfra',
              special: 'Przynajmniej jeden znak specjalny',
              space: 'Spacje niedozwolone',
            },
          },
          responseTextCodes: {
            encryption_successful: 'Szyfrowanie udane',
            decryption_successful: 'Deszyfrowanie udane',
            encryption_failed: 'Szyfrowanie nieudane',
            decryption_failed: 'Deszyfrowanie nieudane',
            file_open_failed: 'Nie można otworzyć pliku',
            file_read_failed: 'Nie można odczytać pliku',
            file_creation_failed: 'Utworzenie pliku nieudane',
            key_generation_failed: 'Generowanie klucza nieudane',
            invalid_password: 'Nieprawidłowe hasło',
            db_conn_failed: 'Połączenie z bazą danych nieudane',
            parent_directory_retrieve_failed:
              'Nie można pobrać katalogu nadrzędnego',
            file_name_extraction_failed: 'Wyodrębnienie nazwy pliku nieudane',
            file_extension_extraction_failed: 'Nieprawidłowy plik',
            file_creation_successful: 'Utworzenie pliku udane',
            logs_downloaded: 'Pobrano logi',
            file_delete_failed: 'Failed to delete original file',
          },
        },
        logs: {
          headers: {
            timestamp: 'Znacznik czasu',
            level: 'Poziom',
            message: 'Wiadomość',
          },
          status: {
            empty: 'Brak dostępnych logów',
            downloadSuccess: 'Logi zostały pobrane pomyślnie',
            downloadError: 'Błąd pobierania logów',
            deleted: 'Logi zostały usunięte',
            fetchError: 'Nie udało się pobrać logów',
          },
          dialog: {
            title: 'Czy na pewno chcesz usunąć logi?',
            description:
              'Ta akcja jest nieodwracalna i trwale usunie wszystkie logi.',
          },
        },
        settings: {
          theme: {
            label: 'Motyw',
          },
          language: {
            label: 'Język',
            select: 'Wybierz język',
            search: 'Szukaj języka',
            empty: 'Nie znaleziono języka',
          },
        },
        donation: {
          dialog: {
            title: 'Wesprzyj Projekt Darowizną',
            description:
              'Twój wkład pomaga nam utrzymać tę aplikację szyfrującą darmową, szybką i bezpieczną. Każda darowizna ma znaczenie.',
            info: 'Twoja darowizna zostanie bezpiecznie przetworzona przez zaufanego dostawcę płatności. Gizliliinize değer veriyoruz.',
            openButton: 'Wesprzyj nas',
            buttonLabel: 'Przejdź do płatności',
          },
          form: {
            amount: {
              label: 'Kwota darowizny',
              placeholder: 'Wprowadź kwotę',
            },
            currency: {
              label: 'Wybierz walutę',
              search: 'Szukaj waluty',
              noResult: 'Nie znaleziono waluty',
            },
          },
          validation: {
            minAmount: 'Kwota darowizny musi wynosić co najmniej 1',
            invalidAmount: 'Kwota darowizny musi być liczbą',
            missingInfo: 'Przed kontynuowaniem podaj kwotę i wybierz walutę',
          },
        },
        footer: {
          credits: 'Stworzone przez',
        },
      },
    },
  },
})

export default i18n
