> Property Harvesting Workflow API

```
Harvesting-Workflow
├── getInboxHarvestingApplication
├── getOutboxHarvestingApplication
├── getSpecialHarvestingApplication
├── getHarvestingCandidates
└── getApplicationFullDetailsById
    ├── postIndependentComment
    ├── postEscalate
    └── postNextLevel
```

> #1 getInboxHarvestingApplication
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

> #2 getOutboxHarvestingApplication
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

> #3 getSpecialHarvestingApplication
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

> #4 getHarvestingCandidates
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

> #5 getHarvestingApplicationFullDetailsById
```
request
├── ulbId
├── workflowId
└── harvestingApplicationId
response
├── levelPendingData..
├── safDetails..
├── floorDetails..
├── documents..
├── HarvestingDetails..
└── HarvestingDocuments..
```

> #6 postIndependentComment
```
request
├── Comment
├── HarvestingApplicationId
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
├── HarvestingApplicationId
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
├── HarvestingApplicationId
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
