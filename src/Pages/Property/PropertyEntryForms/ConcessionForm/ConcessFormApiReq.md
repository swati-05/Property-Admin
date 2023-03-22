<!-----------------------------------------------------------------
// Author      : R U Bharti
// Date        : 16th Nov., 2022  01:30 PM
// Project     : JUIDCO
// Component   : ConcessionFormApiReq
// Description : Concession entry form API requirements
------------------------------------------------------------------>
 
Concession Entry Form
========================================
concessionForm   
    request
        |--gender
        |--dob
        |--isSpeciallyAbled
        |--isArmedForce
        |--genderDoc
        |--dobDoc
        |--speciallyAbledDoc
        |--armedForceDoc
    
    response
        |--status
        |--message



Concession Workflow
=============================================

getConcessionList
    <!-- request
        --id -->

    response
        --wardId
        --ownerName
        --propertyType
        --holdingNo

getConcession
    request
        --id

    response
        --wardId
        --holdingNo
        --ownerName
        --propertyType
        --dob
        --gender
        --armedForce
        --speciallyAbled
        --dobDoc
        --genderDoc
        --armedForceDoc
        --speciallyAbledDoc


<!-- Note : All below status must be pending in default -->

getConcessionDocStatus
    request
        --id

    response
        --dobDoc
        --genderDoc
        --armedForceDoc
        --speciallyAbledDoc
        --dobDocStatus
        --genderDocStatus
        --armedForceDocStatus
        --speciallyAbledDocStatus
        --dobDocRemarks
        --genderDocRemarks
        --armedForceDocRemarks
        --speciallyAbledDocRemarks

postConcessionDoc
    request
        --id
        --dobDoc
        --genderDoc
        --armedForceDoc
        --speciallyAbledDoc
        

postConcessionDocStatus
    --id
    --dobDocStatus
    --genderDocStatus
    --armedForceDocStatus
    --speciallyAbledDocStatus
    --dobDocRemarks
    --genderDocRemarks
    --armedForceDocRemarks
    --speciallyAbledDocRemarks

postConcessionRemark
    request
      --id
      --type
      --remarks
      --document
      
getConcessionRemark
    request
        --id
    
    response
        --type
        --remarks
        --document

postConcessionComment
    request
        --id
        --comment