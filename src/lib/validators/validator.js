const isInvalidId = (...ids) => ids.some((id) => id.length !== 24);

const incompleteValues = (...values) => values.some((value) => !value);

export { isInvalidId, incompleteValues };
