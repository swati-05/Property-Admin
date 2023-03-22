<!-- 
//////////////////////////////////////////////////////////////////////
// Author      : R U Bharti
// Date        : 22nd Nov., 2022  10:25 PM
// Project     : JUIDCO
// Component   : Cluster Api Req.
//////////////////////////////////////////////////////////////////////
 -->

<!-- Cluster Form -->

 get-all-cluster
    response
        |--clusterName
        |--type
        |--address
        |--mobileNo
        |--authorizedPersonName

delete-cluster/ById
    request
        |--id
---------------------------------
update-cluster/ById
    request
        |--clusterName
        |--type
        |--address
        |--mobileNo
        |--authorizedPersonName
-----------------------------------
view-cluster/ById
    request
        |--id

    response
        |--clusterName
        |--type
        |--address
        |--mobileNo
        |--authorizedPersonName

---------------------------------------------------------------------

<!-- Mapping Holding Number -->
get-holdingNo-list/ById ->undercluster 
    request
        |--id

    response
        |--wardNo
        |--ownerName
        |--address
        |--propertyType
        |--mobileNo
-------------------------------------------------
get-all-holdingNo ->all holding-user
    response
        |--wardNo
        |--ownerName
        |--address
        |--propertyType
        |--mobileNo
---------------------------------- ----------------
post-holdingNo/ById ->to respective cluster
    request
        |--wardNo
        |--ownerName
        |--address
        |--propertyType
        |--mobileNo
