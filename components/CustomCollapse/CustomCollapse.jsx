import React, {useState} from 'react';
import {Collapse, CollapseBody, CollapseHeader} from "accordion-collapse-react-native";
import CustomCollapseHeader from "../CustomHeader/CustomCollapseHeader";
import CustomCollapseBody from "../CustomCollapseBody/CustomCollapseBody";

const CustomCollapse = ({question}) => {

    return (
        <Collapse>
            <CustomCollapseHeader>{question.name}</CustomCollapseHeader>
            <CollapseBody>
                {question.questionsArray.map(questionsItem =>
                    <CustomCollapseBody>
                        {questionsItem}
                    </CustomCollapseBody>)}
            </CollapseBody>
        </Collapse>
    );
};

export default CustomCollapse;