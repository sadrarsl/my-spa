import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

/**
 * Resource object containing translation strings for multiple languages.
 */
const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      about: "About Us",
      contact: "Contact",
      login: "Login",
      username: "Username",
      password: "Password",
      invalidCredentials: "Invalid credentials",
      search: "Search",
      addItem: "Add Item",
      id: "ID",
      title: "Title",
      agreed: "Agreed",
      type: "Type",
      actions: "Actions",
      yes: "Yes",
      no: "No",
      save: "Save",
      cancel: "Cancel",
      privatePage: "Private Page",
      welcomeDescription: "Welcome to the Home Page. This page is responsive and adjusts to different screen sizes.",
      aboutDescription: "This is the About Us page. It is designed to be responsive and visually appealing.",
      submit: "Submit",
      email: "Email",
      subject: "Subject",
      description: "Description",
      noData: "No data available",
      networkError: "Network error",
      itemNotFound: "Item not found",
      titleRequired: "Title is required",
      rowsPerPage: "Rows per page",
    },
  },
  fr: {
    translation: {
      welcome: "Bienvenue",
      about: "À propos de nous",
      contact: "Contact",
      login: "Connexion",
      username: "Nom d'utilisateur",
      password: "Mot de passe",
      invalidCredentials: "Identifiants invalides",
      search: "Rechercher",
      addItem: "Ajouter un élément",
      id: "ID",
      title: "Titre",
      agreed: "D'accord",
      type: "Type",
      actions: "Actions",
      yes: "Oui",
      no: "Non",
      save: "Sauvegarder",
      cancel: "Annuler",
      privatePage: "Page privée",
      welcomeDescription: "Bienvenue sur la page d'accueil. Cette page est réactive et s'adapte à différentes tailles d'écran.",
      aboutDescription: "Ceci est la page À propos de nous. Elle est conçue pour être réactive et visuellement attrayante.",
      submit: "Soumettre",
      email: "Email",
      subject: "Sujet",
      description: "Description",
      noData: "Aucune donnée disponible",
      networkError: "Erreur réseau",
      itemNotFound: "Élément non trouvé",
      titleRequired: "Le titre est requis",
      rowsPerPage: "Lignes par page",
    },
  },
  es: {
    translation: {
      welcome: "Bienvenido",
      about: "Sobre nosotros",
      contact: "Contacto",
      login: "Iniciar sesión",
      username: "Nombre de usuario",
      password: "Contraseña",
      invalidCredentials: "Credenciales inválidas",
      search: "Buscar",
      addItem: "Agregar elemento",
      id: "ID",
      title: "Título",
      agreed: "De acuerdo",
      type: "Tipo",
      actions: "Acciones",
      yes: "Sí",
      no: "No",
      save: "Guardar",
      cancel: "Cancelar",
      privatePage: "Página privada",
      welcomeDescription: "Bienvenido a la página de inicio. Esta página es receptiva y se adapta a diferentes tamaños de pantalla.",
      aboutDescription: "Esta es la página Sobre nosotros. Está diseñada para ser receptiva y visualmente atractiva.",
      submit: "Enviar",
      email: "Correo electrónico",
      subject: "Asunto",
      description: "Descripción",
      noData: "No hay datos disponibles",
      networkError: "Error de red",
      itemNotFound: "Elemento no encontrado",
      titleRequired: "El título es obligatorio",
      rowsPerPage: "Filas por página",
    },
  },
  de: {
    translation: {
      welcome: "Willkommen",
      about: "Über uns",
      contact: "Kontakt",
      login: "Anmelden",
      username: "Benutzername",
      password: "Passwort",
      invalidCredentials: "Ungültige Anmeldeinformationen",
      search: "Suchen",
      addItem: "Element hinzufügen",
      id: "ID",
      title: "Titel",
      agreed: "Zustimmen",
      type: "Typ",
      actions: "Aktionen",
      yes: "Ja",
      no: "Nein",
      save: "Speichern",
      cancel: "Abbrechen",
      privatePage: "Private Seite",
      welcomeDescription: "Willkommen auf der Startseite. Diese Seite ist reaktionsschnell und passt sich verschiedenen Bildschirmgrößen an.",
      aboutDescription: "Dies ist die Seite Über uns. Es ist so konzipiert, dass es reaktionsschnell und optisch ansprechend ist.",
      submit: "Einreichen",
      email: "E-Mail",
      subject: "Betreff",
      description: "Beschreibung",
      noData: "Keine Daten verfügbar",
      networkError: "Netzwerkfehler",
      itemNotFound: "Element nicht gefunden",
      titleRequired: "Titel ist erforderlich",
      rowsPerPage: "Zeilen pro Seite",
    },
  },
 
};

/**
 * Initializes the i18n instance with language detection and react-i18next configuration.
 *
 * @returns {void}
 */
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
