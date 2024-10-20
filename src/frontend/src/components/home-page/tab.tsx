import { Link } from "react-router-dom";

type TabProps = {
	linkTo: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	isActive: boolean;
	onClick: () => void;
};

const Tab: React.FC<TabProps> = ({ linkTo, label, icon: Icon, isActive, onClick }) => {
	return (
		<nav className="group flex flex-col items-center cursor-pointer max-lg:w-44">
			<Link
				to={linkTo} 
				className={`flex items-center ${isActive ? "text-black" : "text-gray-500"}`}
				aria-pressed={isActive}
				role="button"
				onClick={onClick} 
			>
				{isActive && <Icon className="mr-2" />}
				<span className={`font-medium text-sm lg:text-lg`}>
					{label}
				</span>
			</Link>
			{isActive && <div className="block h-1 w-full bg-primary mt-2"></div>}
		</nav>

	);
};

export default Tab;
