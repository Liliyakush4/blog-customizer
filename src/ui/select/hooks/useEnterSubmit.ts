// кастомный хук, который добавляет обработку нажатия клавиши Enter
// для переключения состояния (открыть/закрыть)
import { useEffect } from 'react';

type UseEnterSubmit = {
	onChange: React.Dispatch<React.SetStateAction<boolean>>; // функция для изменения состояния
	placeholderRef: React.RefObject<HTMLDivElement>; // ref на DOM-элемент
};

export const useEnterSubmit = ({
	//
	placeholderRef,
	onChange,
}: UseEnterSubmit) => {
	useEffect(() => {
		// работает только когда компонент смотнировани и ref доступен
		const placeholderEl = placeholderRef.current;
		if (!placeholderEl) return;

		const handleEnterKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				// при нажатии на Enter
				onChange((isOpen: boolean) => !isOpen); //передает функцию, которая инвертирует текущее значение
			}
		};
		placeholderEl.addEventListener('keydown', handleEnterKeyDown); // добавляет обработчик при монтировании

		return () => {
			placeholderEl.removeEventListener('keydown', handleEnterKeyDown); // удаляет при размонтировании
		};
	}, []); // зависимости пусты - effect выполняется только при монтировании
};
