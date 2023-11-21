export const missingFields = (prod)=>{
        const undefinedFields = [];
    for (const key in prod) {
        if (prod.hasOwnProperty(key) && prod[key] === undefined) {
            undefinedFields.push(key);
        }
    }
    return `${undefinedFields.length > 1 ? 'Las propiedades' : 'La propiedad'}: ${undefinedFields.length > 1? undefinedFields.map((value, index)=> `${index + 1 == undefinedFields.length? ` ${value}` : ` ${value}`}`) : `${undefinedFields[0]}`} ${undefinedFields.length > 1? 'son obligatorias.' : 'es obligatoria.'}`;
}