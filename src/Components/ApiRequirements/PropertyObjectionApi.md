> Property Objection Workflow API

```
Objection-Workflow
├── getInboxObjectionApplication
├── getOutboxObjectionApplication
├── getSpecialObjectionApplication
├── getObjectionCandidates
└── getApplicationFullDetailsById
    ├── postIndependentComment
    ├── postEscalate
    └── postNextLevel
```

> #1 getInboxObjectionApplication
```
request
├── ulbId
└── workflowId
response
├── wardNo
├── holdingNo
├── ownerName
├── mobileNo
├── applyDate
└── receivedDate
```

> #2 getOutboxObjectionApplication
```
request
├── ulbId
└── workflowId
response
├── wardNo
├── holdingNo
├── ownerName
├── mobileNo
├── applyDate
└── receivedDate
```

> #3 getSpecialObjectionApplication
```
request
├── ulbId
└── workflowId
response
├── wardNo
├── holdingNo
├── ownerName
├── mobileNo
├── applyDate
└── receivedDate
```

> #4 getObjectionCandidates
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

> #5 getObjectionApplicationFullDetailsById
```
request
├── ulbId
├── workflowId
└── objectionApplicationId
response
├── levelPendingData..
├── safDetails..
├── floorDetails..
├── documents..
├── ObjectionDetails..
└── ObjectionDocuments..
```

> #6 postIndependentComment
```
request
├── Comment
├── ObjectionApplicationId
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
├── ObjectionApplicationId
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
├── ObjectionApplicationId
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
