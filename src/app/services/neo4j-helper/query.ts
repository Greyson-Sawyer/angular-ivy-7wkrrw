export const query = `
MATCH (c:SuperiorCourtCase)
WHERE c.eAccessId IS NOT NULL AND c.aslanCaseType IS NOT null
OPTIONAL MATCH (c)-[r]-(a)
RETURN c.caseNumber as Case_Number, c.aslanCaseType AS Aslan_Case_Type, c.fileDate AS File_Date, c.eAccessId as eAccess_Id, c.title AS Title, c.url AS url, c.category AS Category, c.caseType AS Case_Type, c.categoryDescription AS Category_Description, c.eAccessStatus AS eAccess_Status, c.courtName AS Court_Name, c.location AS Location, c.judge AS Judge, collect(a) AS nodes, collect(r) AS rels
ORDER BY c.aslanCaseType, c.fileDate DESC
SKIP 0
LIMIT 1`;
