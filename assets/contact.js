/*
 * 2human website: sends a contact-form submission to the admin hub's CRM inbox (Firestore hubs/2human-admin/inbox,
 * project admin-2human), per docs/contact-inbox.md. The ops worker (onInbox) files each one into the CRM.
 * Firebase and App Check load only when someone sends the form, so a page view loads no third-party code.
 *
 * READY: false until the CRM move to admin.2-human.com is finished and the inbox rules, the website's web app and
 * App Check are deployed (operator decision D3, 25 Nov 2026). While false, a submission is refused and the visitor
 * sees the form's error message; flip it to true, rebuild and publish when the inbox is live.
 */
(function () {
  var READY = false;
  var SDK = "https://www.gstatic.com/firebasejs/10.12.0/";
  var CONFIG = {   // the "2-human.com website" web app in admin-2human (public by design)
    apiKey: "AIzaSyA0dUU1XRSRxCiZBtbAsOmbDx5Dh0S6JsQ",
    authDomain: "admin-2human.firebaseapp.com",
    projectId: "admin-2human",
    storageBucket: "admin-2human.firebasestorage.app",
    messagingSenderId: "281928284980",
    appId: "1:281928284980:web:7ca60849b9b267564c8361"
  };
  var APP_CHECK_SITE_KEY = "6LcSpBQuAAAAAGtKF6xXdxfWVWC3-ZRyocWNYErl";
  var PATH = "hubs/2human-admin/inbox";

  var db = null;
  function connect() {
    if (db) return Promise.resolve(db);
    return Promise.all([import(SDK + "firebase-app.js"), import(SDK + "firebase-app-check.js"), import(SDK + "firebase-firestore.js")]).then(function (m) {
      var app = m[0].initializeApp(CONFIG, "website");
      m[1].initializeAppCheck(app, { provider: new m[1].ReCaptchaEnterpriseProvider(APP_CHECK_SITE_KEY), isTokenAutoRefreshEnabled: true });
      db = { fs: m[2], db: m[2].getFirestore(app) };
      return db;
    });
  }

  // f: { name, email, organization, message, consent }
  function submit(f) {
    if (!READY) return Promise.reject(new Error("The contact inbox is not switched on yet (assets/contact.js READY)."));
    return connect().then(function (c) {
      var attribution = {};
      try { attribution = JSON.parse(sessionStorage.getItem("attribution") || "{}"); } catch (e) { /* none */ }
      var rec = Object.assign({
        name: f.name, email: f.email, organization: f.organization, message: f.message,
        page: location.pathname.slice(0, 300), lang: (document.documentElement.lang || "en").slice(0, 10)
      }, attribution, { consent: f.consent === true, createdAt: c.fs.serverTimestamp() });
      Object.keys(rec).forEach(function (k) { if (rec[k] === "" || rec[k] == null) delete rec[k]; });   // only filled fields (the rules refuse empty optional ones)
      return c.fs.setDoc(c.fs.doc(c.fs.collection(c.db, PATH)), rec);
    });
  }
  window.TWOHUMAN_CONTACT = { submit: submit, ready: READY };
})();
