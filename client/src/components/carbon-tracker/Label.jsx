import typeToColor from '../../utils/typeToColor';

export default function Label({ data }) {
    if (!data) return <></>;
    return (
        <div className="labels flex justify-between">
            <div className="flex gap-2">
                <div
                    className="w-2 h-2 rounded py-3"
                    style={{ background: typeToColor(data.type) ?? '#f9c74f' }}
                ></div>
                <h3 className="text-md">{data.type ?? ''}</h3>
            </div>
            <h3 className="font-bold">{data.percentage | 0}%</h3>
        </div>
    );
}
