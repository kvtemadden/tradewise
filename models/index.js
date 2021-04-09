const User = require('./User');
const Job = require('./Job');
const Comment = require('./Comment');
const Role = require('./Role');


Role.hasOne(User, {
  foreignKey: 'role_id',
  onDelete: 'CASCADE'
});

User.belongsTo(Role, {
    foreignKey: 'role_id',
    onDelete: 'CASCADE'
});

User.hasMany(Job, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Role.hasMany(Job, {
  foreignKey: 'role_id',
  onDelete: 'CASCADE'
});

Job.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Job.belongsTo(Role, {
  foreignKey: 'role_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: "cascade"
});

Comment.belongsTo(Job, {
  foreignKey: 'job_id',
  onDelete: "cascade"
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: "cascade"
});

Job.hasMany(Comment, {
  foreignKey: 'job_id',
  onDelete: "cascade"
})

module.exports = { User, Job, Comment, Role };
