// кастомный хук, который добавляет обработку нажатия клавиши Enter для элементов списка
// как если бы по ним кликнули мышкой
import { useEffect } from 'react';
import { OptionType } from 'src/constants/articleProps';

type UseEnterOptionSubmit = {
	onClick: (value: OptionType['value']) => void; // функция обработчик
	value: OptionType['value']; // значение опции
	optionRef: React.RefObject<HTMLLIElement>; // ref на DOM-элемент
};

export const useEnterOptionSubmit = ({
	onClick,
	value,
	optionRef,
}: UseEnterOptionSubmit) => {
	useEffect(() => {
		// эффект с подпиской на события, работает только когда компонент смотнировани и ref доступен
		const option = optionRef.current;
		if (!option) return;
		const handleEnterKeyDown = (event: KeyboardEvent) => {
			if (document.activeElement === option && event.key === 'Enter') {
				// проверяет, что в фокусе нужный элемент и нажата клавиша Enter
				onClick(value); // вызывает функцию с переданым значением
			}
		};

		option.addEventListener('keydown', handleEnterKeyDown); // при монтировании добавляет обработчик
		return () => {
			option.removeEventListener('keydown', handleEnterKeyDown); // при размонтировании удаляет обработчик
		};
	}, [value, onClick, optionRef]); // Effect перезапускается при изменнеии этих значений
};
