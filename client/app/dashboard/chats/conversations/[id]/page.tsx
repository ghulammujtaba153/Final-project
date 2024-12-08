import Conversation from '@/components/dashboard/Conversation';
import React from 'react'

const Page = ({ params }: { params: { id: string } }) => {
    console.log(params.id); 

    return (
        <div className="w-full pl-[80px]">
            <Conversation id={params.id}/>
        </div>
    );
}

export default Page;
