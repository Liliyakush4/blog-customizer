// кастомный хук, который закрывает элемент при клике вне его области
import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean; // текущее состояние (открыто/закрыто)
	onChange: (newValue: boolean) => void; //функция для изменения состояния
	onClose?: () => void; // опциональный клобек при закрытиии
	rootRef: React.RefObject<HTMLDivElement>; // ref на корневой элемент
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClose?.(); // логика выполняется только если элемент открыт
				onChange?.(false);
			}
		};

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [onClose, onChange, isOpen]);
};
