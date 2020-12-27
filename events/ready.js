module.exports = async (client) =>
{
	const config = client.config;
	const log = require('fancylog');

	log.info(`Bot connecté à ${client.user.tag} !`)

	await client.user.setPresence(
	{
		activity:
		{
			name: config.Activites.text,
			type: config.Activites.type
		},
		status: config.Activites.status
	}).then(log.info(`Status définie sur ${config.Activites.status} de type ${config.Activites.type} avec le text ${config.Activites.text}`)).catch(console.error);
};