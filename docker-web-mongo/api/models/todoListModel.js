'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Entre com o nome de uma tarefa:'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['Pendente', 'Em Progresso', 'Completado']
    }],
    default: ['Pendente']
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);