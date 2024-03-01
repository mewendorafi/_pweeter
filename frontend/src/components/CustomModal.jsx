import { Modal } from 'antd';
import AuthForm from './AuthForm';

export default function CustomModal({ open, mode, close }) {
	return (
		<Modal
			open={open}
			footer={null}
			destroyOnClose={true}
			onCancel={() => close()}
		>
			<AuthForm mode={mode} />
		</Modal>
	);
}
