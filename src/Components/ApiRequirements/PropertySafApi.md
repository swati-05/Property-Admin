> Property Saf Api

```
Saf-Workflow
├── getInboxSafApplication
├── getOutboxSafApplication
├── getSpecialSafApplication
├── getSafCandidates
└── getApplicationDetailsById
    ├── postIndependentComment
    ├── postEscalate
    └── postNextLevel
```

> #1 getInboxSafApplication
```
request
├── ulbId
└── workflowId
response
├── safId
├── safNo
├── wardNo
├── propertyType
├── assessmentType
├── applyDate
├── receivedDate
├── mobileNo
├── appliedBy
└── safId
```

> #2 getOutboxSafApplication
```
request
├── ulbId
└── workflowId
response
├── safId
├── safNo
├── wardNo
├── propertyType
├── assessmentType
├── applyDate
├── receivedDate
├── mobileNo
├── appliedBy
└── safId
```

> #3 getSpecialSafApplication
```
request
├── ulbId
└── workflowId
response
├── safId
├── safNo
├── wardNo
├── propertyType
├── assessmentType
├── applyDate
├── receivedDate
├── mobileNo
├── appliedBy
└── safId
```

> #4 getSafCandidates
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

> #5 getSafApplicationFullDtlById
```
request
├── ulbId
├── workflowId
└── safId
response
├── levelPendingData..
├── safDetails..
├── floorDetails..
├── demandDetails..
└── documents..
```

> #6 postIndependentComment
```
request
├── Comment
├── safId
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
├── safId
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
├── safId
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
