import React from 'react'

function Delete () {
    return (
        <>
            <TabPanel value={value} index={0}>
                {/* DocumentMailbox Contains documents uploaded with holding application */}
                <PropertySafDocumentView id={index} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                {/* WorkFlow contains timeline and action for holding application */}
                <PropertySafWorkflowTimeline
                    toast={notify}
                    applicationData={applicationData}
                    members={props.members}
                    showTabFun={setshowTabs}
                    openModal={openModal}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                {/* WorkFlow contains timeline and action for holding application */}
                <BoDocUpload id={index} applicationData={applicationData2} refresh={() => setrefresh(refresh + 1)} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                {/* WorkFlow contains timeline and action for holding application */}
                <PropertySafDocumentVerify id={index} />
            </TabPanel>
            <TabPanel value={value} index={4}>
                {/* WorkFlow contains timeline and action for holding application */}
                <PropertySafCustomTab id={index} roleId={roleId} />
            </TabPanel>
        </>
    )
}

export default Delete