import { Modal } from 'antd';
import LoginForm from './AuthForm';

export default function CustomModal({ open, mode, close }) {
	return (
		<Modal
			onCancel={() => close()}
			open={open}
			footer={null}
			destroyOnClose={true}
		>
			<LoginForm mode={mode} />
		</Modal>
	);
}
