> Property Concession Workflow API

```
Concession-Workflow
├── getInboxConcessionApplication
├── getOutboxConcessionApplication
├── getSpecialConcessionApplication
├── getConcessionCandidates
└── getApplicationFullDetailsById
    ├── postIndependentComment
    ├── postEscalate
    └── postNextLevel
```

> #1 getInboxConcessionApplication
```
request
├── ulbId
└── workflowId
response
├── wardNo
├── holdingNo
├── ownerName
├── applyDate
└── receivedDate
```

> #2 getOutboxConcessionApplication
```
request
├── ulbId
└── workflowId
response
├── wardNo
├── holdingNo
├── ownerName
├── applyDate
└── receivedDate
```

> #3 getSpecialConcessionApplication
```
request
├── ulbId
└── workflowId
response
├── wardNo
├── holdingNo
├── ownerName
├── applyDate
└── receivedDate
```

> #4 getConcessionCandidates
```
request
├── ulbId
├── workflowId
├── designation
└── ward
response
├── candidateId
├── designation
└── candidateImage
```

> #5 getConcessionApplicationFullDetailsById
```
request
├── ulbId
├── workflowId
└── concessionApplicationId
response
├── levelPendingData..
├── safDetails..
├── floorDetails..
├── documents..
├── concessionDetails..
└── concessionDocuments..
```

> #6 postIndependentComment
```
request
├── Comment
├── concessionApplicationId
├── SenderId
├── designationId
├── ulbId
└── DateTime
response
├── comment
├── senderDesignation
└── dateTime
```

> #6 postEscalate
```
request
├── escalateStatus
├── concessionApplicationId
├── SenderId
├── designationId
├── ulbId
└── DateTime
get
└── escalteStatus
```

> #7 postNextLevel
```
request
├── concessionApplicationId
├── ulbId
├── senderDesignationId
├── receiverDesignationId
├── senderId
├── receiverId
├── comment
└── DateTime
response
├── senderDesignation
├── senderId
└── comment
```
