const INVALID_TYPES = 1;
const MISSING_REQUIRED_FIELDS = 2;
const FIELD_VALIDATION_FAILED = 3;
const NOT_FOUND = 4;
const DATABASE_ERROR = 5;
const CONFLICT_ERROR = 6;
const UNKNOWN_ERROR = -999;

const typeError = {
    INVALID_TYPES: INVALID_TYPES,
    MISSING_REQUIRED_FIELDS: MISSING_REQUIRED_FIELDS,
    FIELD_VALIDATION_FAILED: FIELD_VALIDATION_FAILED,
    NOT_FOUND: NOT_FOUND, 
    DATABASE_ERROR: DATABASE_ERROR,
    CONFLICT_ERROR: CONFLICT_ERROR,
    UNKNOWN_ERROR: UNKNOWN_ERROR,
  };
  
export default typeError;