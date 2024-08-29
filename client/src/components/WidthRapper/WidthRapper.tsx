interface IProps {
	child: React.ReactNode;
	width: number;
}

const WidthRapper: React.FC<IProps> = (props) => {
	return <>{props.child}</>;
};

export default WidthRapper;