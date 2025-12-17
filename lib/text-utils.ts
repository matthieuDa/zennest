/**
 * Convertit un titre anglais (Title Case) en français (minuscules)
 * Garde la première lettre majuscule, le reste minuscules
 * Préserve les noms propres et acronymes spécifiés
 * Exemples:
 *   "Les 5 Pilliers du Bail Mobilité" → "Les 5 pilliers du bail mobilité"
 *   "L'arme Secrète" → "L'arme secrète"
 *   "Est-il soumis à la réglementation AirBnb" → "Est-il soumis à la réglementation AirBnb"
 */
export function normalizeHeadingToFrench(text: string): string {
  if (!text) return '';

  // Liste des noms propres et acronymes à préserver exactement
  const preserveExact = ['ZenNest', 'GLI', 'URSAFF', 'LMNP', 'LMP', 'BIC', 'AirBnb', 'Paris', 'VISALE', 'IFI', 'Durand', 'Dupont', 'Martin', 'SCI', 'TVA', 'BNC', 'SARL', 'SCA', 'Monaco', 'IS', 'JO'];
  
  // Si le texte complet doit être préservé, le retourner tel quel
  if (preserveExact.includes(text)) {
    return text;
  }

  // Remplacer chaque acronyme/nom propre par un placeholder unique, normaliser le reste, puis restaurer
  let result = text;
  const replacements: { [key: string]: string } = {};
  
  // Créer des placeholders pour les mots à préserver (case-insensitive search)
  preserveExact.forEach((word, index) => {
    const placeholder = `XPRESERVEX${index}XPRESERVEX`; // Utiliser un format qui résiste à toLowerCase()
    // Match case-insensitive, mais préserver le mot exact de la liste
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    result = result.replace(regex, placeholder);
    replacements[placeholder] = word; // Stocker le placeholder original
  });

  // Normaliser: première lettre majuscule, le reste minuscules
  // Gérer les cas avec numéros en début : "1. texte" → "1. Texte"
  const numberPrefix = result.match(/^(\d+\.?\s*)/);
  if (numberPrefix) {
    const prefix = numberPrefix[1];
    const restOfText = result.slice(prefix.length);
    if (restOfText.length > 0) {
      result = prefix + restOfText.charAt(0).toUpperCase() + restOfText.slice(1).toLowerCase();
    }
  } else {
    result = result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
  }

  // Restaurer les mots préservés (chercher les placeholders en minuscules car le texte a été lowercasé)
  Object.entries(replacements).forEach(([placeholder, word]) => {
    // Chercher la version lowercase du placeholder puisque result.toLowerCase() a été appliqué
    result = result.replace(new RegExp(placeholder.toLowerCase(), 'gi'), word);
  });

  return result;
}

/**
 * Applique la normalisation à tous les titres Markdown d'un contenu
 * Traite h1, h2, h3, h4, h5, h6
 * Exemples:
 *   "## Les 5 Pilliers du Bail Mobilité" → "## Les 5 pilliers du bail mobilité"
 */
export function normalizeMarkdownHeadings(content: string): string {
  if (!content) return '';

  return content.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, title) => {
    return `${hashes} ${normalizeHeadingToFrench(title)}`;
  });
}

/**
 * Crée un slug URL-safe à partir d'un texte de titre
 * Gère correctement les caractères accentués et spéciaux
 * Exemples:
 *   "Les 5 piliers du bail mobilité" → "les-5-piliers-du-bail-mobilite"
 *   "C'est votre résidence principale" → "cest-votre-residence-principale"
 */
export function createSlug(text: string): string {
  if (!text) return '';
  
  return text
    .toLowerCase()
    // Normaliser les caractères accentués (é -> e, à -> a, etc.)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Remplacer les apostrophes et guillemets par rien
    .replace(/['']/g, '')
    // Garder seulement les lettres, chiffres, espaces et tirets
    .replace(/[^\w\s-]/g, '')
    // Remplacer les espaces multiples par un seul tiret
    .replace(/\s+/g, '-')
    // Supprimer les tirets multiples
    .replace(/-+/g, '-')
    // Supprimer les tirets au début et à la fin
    .replace(/^-+|-+$/g, '');
}
