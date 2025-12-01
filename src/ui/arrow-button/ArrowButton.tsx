{
	/* Компонент кнопки со стрелкой */
}
import arrow from 'src/images/arrow.svg'; // svg иконка стрелки

import styles from './ArrowButton.module.scss'; // стили компонента
import clsx from 'clsx'; // утилита для классов

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
	isOpen: boolean; // текущее состояние (открыто/закрыто)
	onClick: OnClick; // обработчик клика
};

export const ArrowButton = ({ isOpen, onClick }: ArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, { [styles.container_open]: isOpen })}
			onClick={onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
			/>
		</div>
	);
};
