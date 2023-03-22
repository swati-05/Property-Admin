> Workflow Master Api

```
Workflow Master
├── getWorkflowList
├── getWorkflowFullDtlById
├── postCandidateRemove
├── deleteWorkflow
├── postAddWorkflow
├── getEditWorkflowDtl
└── postUpdateWorkflow
```

> #1 getWorkflowList
```
request
├── 
└── 
response
├── workflowName
├── initiator
├── finisher
├── workflowId
├── ulbName
├── ulbId
├── moduleName
└── moduleId
```

> #2 getWorkflowFullDtlById
```
request
├── workflowId
├── moduleId
└── ulbId
response
├── totalCandidates
├── initiator
├── finisher
└── allCandidates[candidateName,candidateId,designationName,designationId]
```

> #3 postCandidateRemove
```
request
├── candidateId
├── workflowId
├── moduleId
└── ulbId
response
├── candidateId
├── workflowId
├── moduleId
└── ulbId
```

> #4 deleteWorkflow
```
request
├── workflowId
├── moduleId
└── ulbId
response
├── workflowId
├── moduleId
└── ulbId
```

> #5 postAddWorkflow
```
request
├── workflowName
├── moduleId
├── ulbId
├── designationId[]
├── initiatorId
├── finisherId
└── allCandidates[]
response
├── workflowName
├── moduleId
└── ulbId
```

> #6 getEditWorkflowDtl
```
request
├── workflowId
├── moduleId
└── ulbId
response
├── workflowName
├── moduelId
├── ulbId
├── designationId[]
├── initiatorId
├── finisherId
└── allCandidateId[]
```

> #7 postWorkflowUpdate
```
request
├── workflowId
├── workflowName
├── moduleId
├── ulbId
├── designationId[]
├── initiatorId
├── finisherId
└── allCandidates[]
response
├── workflowName
├── moduleName
└── ulbName
```
