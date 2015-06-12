<?php

require_once( ABSPATH . 'wp-admin/includes/plugin.php' );

class EasyOptInsInit {
	private $keys = array(
		'plugin_version' => 'fca_eoi_plugin_version',
		'flash_notification_id' => 'fca_eoi_init_flash_notification_id',
		'new_css' => array(
			'notification_dismissed' => 'fca_eoi_is_notification_activate_new_css_dismissed',
			'activate_action'        => 'fca_eoi_action_activate_new_css'
		)
	);

	private $flash_notification_ids = array(
		'new_css_activated' => 1
	);

	private static $instance;

	public static function get_instance() {
		if ( ! self::$instance ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	public function on_install() {
		powerup_new_css_set_active( true );
		$this->set_new_css_notification_dismissed( true );
	}

	public function on_uninstall() {
		delete_option( $this->keys['plugin_version'] );
	}

	public function setup() {
		add_action( 'admin_notices', array( $this, 'show_notifications' ) );
		add_action( 'admin_init', array( $this, 'admin_init' ) );
	}

	public function admin_init() {
		$saved_plugin_version = get_option( $this->keys['plugin_version'] );
		if ( empty( $saved_plugin_version ) ) {
			$this->on_install();
		}

		$this->save_plugin_version();
		$this->process_actions();
	}

	public function save_plugin_version() {
		$plugin_data = get_plugin_data( FCA_EOI_PLUGIN_FILE );

		update_option( $this->keys['plugin_version'], $plugin_data['Version'] );
	}

	public function show_notifications() {
		$current_user_id = $GLOBALS['current_user']->ID;

		if ( ! $this->is_new_css_notification_dismissed() ) {
			$this->show_new_css_notification();
		}

		$flash_notification_id = get_user_meta( $current_user_id, $this->keys['flash_notification_id'] );

		if ( ! empty( $flash_notification_id ) ) {
			delete_user_meta( $current_user_id, $this->keys['flash_notification_id'] );

			if ( $flash_notification_id == $this->flash_notification_ids['new_css_activated'] ) {
				$this->show_new_css_activated_notification();
			}
		}
	}

	private function set_flash_notification_id( $flash_notification_id ) {
		update_user_meta(
			$GLOBALS['current_user']->ID,
			$this->keys['flash_notification_id'],
			$flash_notification_id
		);
	}

	public function process_actions() {
		if ( isset( $_REQUEST[ $this->keys['new_css']['activate_action'] ] ) ) {
			$this->process_new_css_activation( (boolean) $_REQUEST[ $this->keys['new_css']['activate_action'] ] );
		}
	}

	private function show_new_css_notification() {
		?>

		<div class="updated">
			<p>
				This version of Optin Cat comes with all new CSS for improved theme compatibility
				and mobile friendliness.
				<a href="https://fatcatapps.com/optin-cat-1-3#new-css">Click here to learn more</a>.
			</p>

			<p>
				Activate new CSS?
				<a href="<?php echo add_query_arg( $this->keys['new_css']['activate_action'], 1 ) ?>">Yes</a> |
				<a href="<?php echo add_query_arg( $this->keys['new_css']['activate_action'], 0 ) ?>">No</a>
			</p>
		</div>

		<?php
	}

	private function process_new_css_activation( $activate ) {
		$this->set_new_css_notification_dismissed( true );

		if ( $activate ) {
			powerup_new_css_set_active( true );
			$this->set_flash_notification_id( $this->flash_notification_ids['new_css_activated'] );
		}

		wp_redirect( remove_query_arg( $this->keys['new_css']['activate_action'] ) );
		exit;
	}

	private function show_new_css_activated_notification() {
		?>

		<div class="updated">
			<p>
				New CSS enabled. Please double check your optin forms for possible CSS display issues.
			</p>
		</div>

		<?php
	}

	private function is_new_css_notification_dismissed() {
		return get_user_meta( $GLOBALS['current_user']->ID, $this->keys['new_css']['notification_dismissed'] );
	}

	private function set_new_css_notification_dismissed( $dismissed ) {
		return update_user_meta( $GLOBALS['current_user']->ID, $this->keys['new_css']['notification_dismissed'], $dismissed );
	}
}
