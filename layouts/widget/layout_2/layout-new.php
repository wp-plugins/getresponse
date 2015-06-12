<?php

/**
 * @package    Optin Cat
 */

require_once dirname( __FILE__ ) . '/../../common/layout_2/layout.php';

$layout = fca_eoi_layout_descriptor_2( 'Layout 2', 'layout_2', array(
	'headline_copy' => 'Email Goodies',
	'description_copy' => 'Subscribe now and be the first to receive all the latest updates!',
	'name_placeholder' => 'Name',
	'email_placeholder' => 'Email',
	'button_copy' => 'Sign Up Now',
	'privacy_copy' => "100% Privacy. We don't spam.",
) );
