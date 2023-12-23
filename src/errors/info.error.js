export const missingFields = (prod)=>{
        const undefinedFields = [];
    for (const key in prod) {
        if (prod.hasOwnProperty(key) && prod[key] === undefined || prod[key] === '') {
                undefinedFields.push(key);
        }
    }
    return `${undefinedFields.length > 1 ? 'Las propiedades' : 'La propiedad'}: ${undefinedFields.length > 1? undefinedFields.map((value, index)=> `${index + 1 == undefinedFields.length? ` ${value}` : ` ${value}`}`) : `${undefinedFields[0]}`} ${undefinedFields.length > 1? 'son obligatorias.' : 'es obligatoria.'}`;}

export const missingUserField = (field)=>{
    return `El campo "${field === 'name'? 'nombre' : field === 'second_name'? 'segundo nombre' : field === 'last_name'? 'apellido' : field === 'email' ? 'email' : ''}" no puede estar vacío.`;
}