// Middleware pour nettoyer les balises <script>
const cleanScriptTagsMiddleware = (req, res, next) => {
    if (req.body) {
        // fonction pour vérifier la présence de balises <script>
        const checkObjectForScriptTags = (obj) => {
            // récupére les clés de l'objet
            const keys = Object.keys(obj);

            // vérifie si l'une des clés contient une balise <script>
            const hasScriptTag = keys.some((key) => {
                // si la valeur est une chaîne de caractères
                if (typeof obj[key] === 'string') {
                    // Vérifiez s'il y a une balise <script> dans la valeur
                    return /<script/i.test(obj[key]);

                // si la valeur est un objet
                } if (typeof obj[key] === 'object') {
                    // vérifie si l'objet contient une balise <script>
                    return checkObjectForScriptTags(obj[key]);
                }
                return false;
            });

            return hasScriptTag;
        };

        // si la fonction renvoie true, renvoyez une erreur
        if (checkObjectForScriptTags(req.body)) {
            return res.status(400).json({ error: '<script> tag not allowed in data' });
        }
    }

    next();
};

export default cleanScriptTagsMiddleware;
