import React, { FunctionComponent } from 'react'
import SummaryCard from '../Components/SummaryCard';

const PcBuild: FunctionComponent = () => {
  return (
    <div>
     <SummaryCard totalPrice={12000} compatible={false} />
    </div>
  )
}

export default PcBuild;
