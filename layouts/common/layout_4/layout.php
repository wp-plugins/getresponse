<?php

function fca_eoi_layout_descriptor_4( $name, $layout_id, $texts ) {
	$layout = new EasyOptInsLayout( $layout_id );
	$class  = $layout->layout_class;

	return array(

		'name' => __( $name ),

		'editables' => array(

			// Added to the fieldset "Form Background"
			'form' => array(
				'.fca_eoi_layout_4.' . $class => array(
					'background-color' => array( __( 'Form Background Color' ), '#ffffff' ),
					'border-color' => array( __( 'Border Color' ), '#E5E5E5' ),
				),
			),

			// Added to the fieldset "Headline"
			'headline' => array(
				'.fca_eoi_layout_4.' . $class . ' div.fca_eoi_layout_headline_copy_wrapper div' => array(
					'font-size' => array( __('Font Size'), '25px'),
					'color' => array( __('Font Color'), '#000'),
				),
			),
			'description' => array(
				'.fca_eoi_layout_4.' . $class . ' div.fca_eoi_layout_description_copy_wrapper p, '.
				'.fca_eoi_layout_4.' . $class . ' div.fca_eoi_layout_description_copy_wrapper div' => array(
					'font-size' => array( __('Font Size'), '14px'),
					'color' => array( __('Font Color'), '#444'),
				),
			),
			'name_field' => array(
				'.fca_eoi_layout_4.' . $class . ' div.fca_eoi_layout_name_field_wrapper, ' .
				'.fca_eoi_layout_4.' . $class . ' div.fca_eoi_layout_name_field_wrapper input' => array(
					'color' => array( __( 'Font Color' ), '#999' ),
					'background-color' => array( __( 'Background Color' ), '' ),
				),
				'.fca_eoi_layout_4.' . $class . ' div.fca_eoi_layout_name_field_wrapper' => array(
					'border-color' => array( __('Border Color'), '#DDD'),
				),
			),
			'email_field' => array(
				'.fca_eoi_layout_4.' . $class . ' div.fca_eoi_layout_email_field_wrapper, ' .
				'.fca_eoi_layout_4.' . $class . ' div.fca_eoi_layout_email_field_wrapper input' => array(
					'color' => array( __( 'Font Color' ), '#999' ),
					'background-color' => array( __( 'Background Color' ), ''),
				),
				'.fca_eoi_layout_4.' . $class . ' div.fca_eoi_layout_email_field_wrapper' => array(
					'border-color' => array( __( 'Border Color' ), '#DDD'),
				),
			),
			'button' => array(
				'.fca_eoi_layout_4.' . $class . ' div.fca_eoi_layout_submit_button_wrapper input' => array(
					'font-size' => array( __('Font Size'), '14px'),
					'color' => array( __( 'Font Color' ), '#FFF' ),
					'background-color' => array( __( 'Background Color' ), '#39b0ff' ),
					'border-color' => array( __( 'Border Color' ), '#3498db' ),
				),
				'.fca_eoi_layout_4.' . $class . ' div.fca_eoi_layout_submit_button_wrapper input:hover' => array(
					'background-color' => array( __( 'Hover Background Color' ), '#3498db' ),
				),
			),
			'privacy' => array(
				'.fca_eoi_layout_4.' . $class . ' div.fca_eoi_layout_privacy_copy_wrapper div' => array(
					'font-size' => array( __('Font Size'), '14px'),
					'color' => array( __('Font Color'), '#999'),
				),
			),
			'fatcatapps' => array(
				'.fca_eoi_layout_4.' . $class . ' div.fca_eoi_layout_fatcatapps_link_wrapper a, ' .
				'.fca_eoi_layout_4.' . $class . ' div.fca_eoi_layout_fatcatapps_link_wrapper a:hover' => array(
					'color' => array( __('Font Color'), '#999'),
				),
			),
		),

		'autocolors' => array(
			array(
				'source' => '[.fca_eoi_layout_4.' . $class . ' div.fca_eoi_layout_submit_button_wrapper input][background-color]',
				'destination' => '[.fca_eoi_layout_4.' . $class . ' div.fca_eoi_layout_submit_button_wrapper input][border-color]',
				'operations' => array(
					'spin' => '0.13246234803119705',
					'desaturate' => '30.125523012552313',
					'darken' =>  '8.039215686274515',
				),
			),
			array(
				'source' => '[.fca_eoi_layout_4.' . $class . ' div.fca_eoi_layout_submit_button_wrapper input][background-color]',
				'destination' => '[.fca_eoi_layout_4.' . $class . ' div.fca_eoi_layout_submit_button_wrapper input:hover][background-color]',
				'operations' => array(
					'spin' => '0.13246234803119705',
					'desaturate' => '30.125523012552313',
					'darken' =>  '8.039215686274515',
				),
			),
		),

		'texts' => $texts
	);
}
