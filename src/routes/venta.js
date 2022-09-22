const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

router.get('/api/ventas', (req, res) => {
    mysqlConnection.query('SELECT * FROM ventas', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });  
  });
  
  // Obtener un corte
  router.get('/api/ventas/:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM ventas WHERE id = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    });
  });
  
  // Borrar un corte
  router.delete('/api/ventas/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM ventas WHERE id = ?', [id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'corte eliminado'});
      } else {
        console.log(err);
      }
    });
  });
  
  // Crear un corte
  router.post('/api/ventas', (req, res) => {
    const {id, cantidad, precio, fecha, id_corte} = req.body;
    const query = `
      SET @id = ?;
      SET @cantidad = ?;
      SET @precio = ?;
      SET @fecha = ?;
      SET @id_corte = ?;
      CALL ventaAdd(@id, @cantidad, @precio, @fecha, @id_corte);
    `;
    mysqlConnection.query(query, [id,  cantidad, precio, fecha, id_corte], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Venta registrada'});
      } else {
        console.log(err);
      }
    });
  
  });

  
module.exports = router;
  