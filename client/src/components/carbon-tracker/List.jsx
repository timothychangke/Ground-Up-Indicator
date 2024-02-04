import React from 'react';
import 'boxicons';
import { default as api } from '../../store/apiSlice';
import typeToColor from '../../utils/typeToColor';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

export default function List() {
    const { user } = useContext(UserContext);
    const { data, isFetching, isSuccess, isError } =
        api.useGetActivityQuery(user);
    const [deleteActivity] = api.useDeleteTransactionMutation();
    let Lists;
    const handleClick = (e) => {
        if (!e.target.dataset.id) return;
        deleteActivity({ _id: e.target.dataset.id });
    };
    if (isFetching) {
        Lists = <div>Loading...</div>;
    } else if (isSuccess) {
        Lists = data.map((v, i) => (
            <Activity key={i} category={v} handler={handleClick}></Activity>
        ));
    } else if (isError) {
        Lists = <div>Error</div>;
    }

    return (
        <div className="flex flex-col py-6 gap-3">
            <h1 className="py-4 text-md font-bold text-xl">History</h1>
            {Lists}
        </div>
    );
}

function Activity({ category, handler }) {
    if (!category) return null;
    return (
        <div
            className="item flex justify-center bg-gray-50 py-2 rounded-r px-3"
            style={{
                borderRight: `8px solid ${
                    typeToColor(category.type) ?? 'e5e5e5'
                }`,
            }}
        >
            <button>
                <box-icon
                    name="trash"
                    size="15px"
                    color={typeToColor(category.type) ?? 'e5e5e5'}
                    onClick={handler}
                    data-id={category._id}
                />
            </button>
            <span className="block w-full">{category.name ?? ''}</span>
        </div>
    );
}
