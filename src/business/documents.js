export function update(nurse, documentTypes, currentDocuments) {
  const currentDocumentMap = {};

  for (const currentDocument of currentDocuments) {
    currentDocumentMap[currentDocument.documentTypeId] = currentDocument;
  }

  const documentTypesIds = documentTypes.map(({ id }) => id);
  const documents = [];
  let newDocumentsCount = 0;

  for (const documentTypeId of documentTypesIds) {
    const currentDocument = currentDocumentMap[documentTypeId];

    if (currentDocument) {
      documents.push(currentDocument);
    } else {
      documents.push({
        id: currentDocuments.length + newDocumentsCount,
        status: 'not_uploaded',
        documentTypeId,
        files: [],
        expiresAt: null
      });

      newDocumentsCount += 1;
    }
  }

  return documents;
}

