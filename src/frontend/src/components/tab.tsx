type TabProps = {
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	isActive: boolean;
	onClick: () => void;
};

const Tab: React.FC<TabProps> = ({ label, icon: Icon, isActive, onClick }) => {
	return (
		<div
			className="group flex flex-col items-center cursor-pointer max-lg:w-44"
			role="button"
			aria-pressed={isActive}
			onClick={onClick}
		>
			<div className="flex items-center">
				{isActive && <Icon className="mr-2" />}
				<span
					className={`font-medium text-sm lg:text-lg ${isActive ? "text-black" : "text-gray-500"}`}
				>
					{label}
				</span>
			</div>
			{isActive && <div className="block h-1 w-full bg-primary mt-2"></div>}
		</div>
	);
};

export default Tab;
