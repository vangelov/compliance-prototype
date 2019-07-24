
function specialtiesForDocumentTypeId(specialties, documentTypeId) {
  return specialties.filter(
    (specialty) => specialty.documentTypeIds.indexOf(documentTypeId) >= 0
  );
}

export function update(specialties, currentDocuments) {
  const currentDocumentMap = {};

  for (const currentDocument of currentDocuments) {
    currentDocumentMap[currentDocument.documentTypeId] = currentDocument;
  }

  const documentTypeIdMet = {};
  const documentTypesIds = []

  for (const specialty of specialties) {
    for (const documentTypeId of specialty.documentTypeIds) {
      if (!documentTypeIdMet[documentTypeId]) {
        documentTypeIdMet[documentTypeId] = true;
        documentTypesIds.push(documentTypeId);
      }
    }
  }

  const documents = [];
  let newDocumentsCount = 0;

  for (const documentTypeId of documentTypesIds) {
    const currentDocument = currentDocumentMap[documentTypeId];
    const requiredSpecialties = specialtiesForDocumentTypeId(specialties, documentTypeId);

    if (currentDocument) {
      const stampForSpecialtyMap = {};
      const stamps = [];

      for (const stamp of currentDocument.stamps) {
        stampForSpecialtyMap[stamp.specialtyId] = stamp;
      }

      for (const specialty of requiredSpecialties) {
        const currentStamp = stampForSpecialtyMap[specialty.id];
        
        if (currentStamp) {
          stamps.push(currentStamp);
        }
        else  {
          stamps.push({
            expiresAt: '',
            status: 'not_uploaded',
            specialtyId: specialty.id
          });
        }
      }

      documents.push({
        ...currentDocument,
        stamps
      });
    } else {
      const stamps = requiredSpecialties.map((specialty) => ({
        status: 'not_uploaded',
        expiresAt: '',
        specialtyId: specialty.id
      }));

      documents.push({
        id: currentDocuments.length + newDocumentsCount,
        status: 'not_uploaded',
        documentTypeId,
        files: [],
        expiresAt: null,
        stamps
      });

      newDocumentsCount += 1;
    }
  }

  return documents;
}

