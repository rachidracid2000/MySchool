const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Laisse vide si tu es sur Wamp et tu n'as pas mis de mot de passe
    database: 'myschool'
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à MySQL:', err);
    } else {
        console.log('Connecté à MySQL avec succès !');
    }
});
  //************************ eleve ******************** *

// ➡️ Route pour ajouter un élève
app.post('/ajouterEleve', (req, res) => {
  console.log('✅ Reçu:', req.body);
    const { nom, prenom, date_naissance, classe, email } = req.body;
    
    const sql = 'INSERT INTO eleves (nom, prenom, date_naissance, classe, email) VALUES (?, ?, ?, ?, ?)';
    
    db.query(sql, [nom, prenom, date_naissance, classe, email], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'ajout :', err);
        res.status(500).json({ error: 'Erreur serveur' });
        return;
      }
      res.status(200).json({ message: 'Élève ajouté avec succès !' });
    });
    
  });

  // GET /eleves
app.get('/afficherEleve', (req, res) => {
  db.query('SELECT * FROM eleves', (err, results) => {
    if (err) {
      console.error('Erreur SQL :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json(results);
  });
});
  // Supprimer un élève
app.delete('/afficherEleve/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM eleves WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// Modifier un élève
app.put('/afficherEleve/:id', (req, res) => {
  const { id } = req.params;
  const { nom, prenom, date_naissance, classe, email } = req.body;

  const sql = "UPDATE eleves SET nom = ?, prenom = ?, date_naissance = ?, classe = ?, email = ? WHERE id = ?";
  db.query(sql, [nom, prenom, date_naissance, classe, email, id], (err, result) => {
    if (err) {
      console.error("Erreur SQL :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.json({ success: true });
  });
}); 


// Route pour récupérer les classes
app.get('/ajouterEleve', (req, res) => {
  const sql = 'SELECT nom_classe FROM classes';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des classes :', err);
      res.status(500).json({ error: 'Erreur serveur' });
    } else {
      const classes = results.map(row => row.nom_classe);
      res.json(classes);
    }
  });
});


  //************************ parent ******************** *

  // ➡️ Route pour ajouter un parent

  app.post('/ajouterParent', (req, res) => {
    const { nom, prenom, telephone, email, enfants, dateNaissance } = req.body;
  
   
  
    const enfantsStr = Array.isArray(enfants) ? enfants.join(', ') : '';
  
    const sql = 'INSERT INTO parents (nom, prenom, telephone, email, enfants, date_naissance) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [nom, prenom, telephone, email, enfantsStr, dateNaissance], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'ajout du parent :', err);
        return res.status(500).json({ error: 'Erreur serveur.' });
      }
      res.status(201).json({ message: 'Parent ajouté avec succès !' });
    });
  });
     // récupérer les noms des élèves
  app.get('/enfants', (req, res) => {
    const sql = 'SELECT CONCAT(prenom, " ", nom) AS nomComplet FROM eleves';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des enfants :', err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        const enfants = results.map(row => row.nomComplet);
        res.json(enfants);
      }
    });
  });
  
   // afficher la list des parent
  app.get('/parents', (req, res) => {
    db.query('SELECT * FROM parents', (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des parents :", err);
        res.status(500).json({ error: "Erreur serveur" });
      } else {
        res.json(results);
      }
    });
  });
  
    // supprimer parent
  app.delete('/parents/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM parents WHERE id = ?', [id], (err) => {
      if (err) return res.status(500).json({ error: "Erreur serveur" });
      res.status(200).json({ message: "Parent supprimé" });
    });
  });
  
  app.put('/parents/:id', (req, res) => {
    const parentId = req.params.id;
    const { nom,prenom, email, telephone, enfants, dateNaissance } = req.body;
  
    const sql = `
      UPDATE parents
      SET nom = ?, prenom = ?, email = ?, telephone = ?, enfants = ?, dateNaissance = ?
      WHERE id = ?
    `;
  
    const values = [nom,prenom, email, telephone, enfants, dateNaissance, parentId];
  
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Erreur lors de la mise à jour du parent :', err);
        res.status(500).json({ message: "Erreur serveur" });
      } else {
        res.status(200).json({ message: "Parent mis à jour avec succès" });
      }
    });
  });
  
  //************************ Ensignant ******************** *
  app.post('/ajouter', (req, res) => {
    const { nom, prenom, telephone, email, matiere, dateNaissance, classes } = req.body;
  
    // Convertir le tableau de classes en une chaîne de caractères séparée par des virgules
    const classesStr = Array.isArray(classes) ? classes.join(', ') : '';
  
    // Insérer l'enseignant dans la table `enseignants`
    const sql = 'INSERT INTO enseignants (nom, prenom, telephone, email, matiere, date_naissance, classes) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [nom, prenom, telephone, email, matiere, dateNaissance, classesStr], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'ajout de l\'enseignant :', err);
        return res.status(500).json({ error: 'Erreur serveur.' });
      }
  
      res.status(201).json({ message: 'Enseignant ajouté avec succès' });
    });
  });
  
  
     
  
//  récupérer la liste des classes
app.get('/classes', (req, res) => {
  const sql = 'SELECT nom_classe FROM classes';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des classes :', err);
      res.status(500).json({ error: 'Erreur serveur' });
    } else {
      const classes = results.map(row => row.nom_classe);
      res.json(classes);
    }
  });
});




// Démarrage du serveur
app.listen(3000, '0.0.0.0', () => { console.log('Serveur démarré sur http://0.0.0.0:3000'); });

