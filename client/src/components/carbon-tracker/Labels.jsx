import Label from './Label';
import { default as api } from '../../store/apiSlice';
import { useContext, useRef } from 'react';
import { UserContext } from '../../context/userContext.jsx';
import labelReducer from '../../utils/dataLabelReducer';

export default function Labels() {
    const { user } = useContext(UserContext);
    const { data, isFetching, isSuccess, isError } =
        api.useGetActivityQuery(user);
    let Labels;
    if (isFetching) {
        Labels = <div>Loading...</div>;
    } else if (isSuccess) {
        const labelData = labelReducer(data);
        Labels = labelData.map((v, i) => <Label key={i} data={v}></Label>);
    } else if (isError) {
        Labels = <div>Error</div>;
    }
    return <>{Labels}</>;
}
