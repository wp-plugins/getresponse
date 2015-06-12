<?php

function fca_eoi_layout_descriptor_3( $name, $layout_id, $include_fold, $texts ) {
	$layout = new EasyOptInsLayout( $layout_id );
	$class  = $layout->layout_class;

	$headline = array(
		'.fca_eoi_layout_3.' . $class . ' div.fca_eoi_layout_headline_copy_wrapper div' => array(
			'font-size' => array( __( 'Font Size'), '30px'),
			'color' => array( __( 'Font Color'), '#FFF'),
			'background-color' => array( __( 'Background Color' ), '#344860' ),
		)
	);

	if ( $include_fold ) {
		$headline['.fca_eoi_layout_3.' . $class . ' svg.fca_eoi_layout_headline_copy_triangle'] = array(
			'fill' => array( __( 'Fold Color' ), '#344860' ),
		);
	}

	return array(

		'name' => __( $name ),

		'editables' => array(

			// Added to the fieldset "Form Background"
			'form' => array(
				'.fca_eoi_layout_3.' . $class => array(
					'background-color' => array( __( 'Form Background Color' ), '#EEE' ),
					'border-color' => array( __( 'Border Color' ), '#D2D2D2' ),
				),
			),
			'headline' => $headline,
			'description' => array(
				'.fca_eoi_layout_3.' . $class . ' div.fca_eoi_layout_description_copy_wrapper p, '.
				'.fca_eoi_layout_3.' . $class . ' div.fca_eoi_layout_description_copy_wrapper div' => array(
					'font-size' => array( __( 'Font Size' ), '14px'),
					'color' => array( __( 'Font Color' ), '#6D6D6D'),
				)
			),
			'name_field' => array(
				'.fca_eoi_layout_3.' . $class . ' div.fca_eoi_layout_name_field_wrapper, ' .
				'.fca_eoi_layout_3.' . $class . ' div.fca_eoi_layout_name_field_wrapper input, ' .
				'.fca_eoi_layout_3.' . $class . ' div.fca_eoi_layout_name_field_wrapper i.fa:before' => array(
					'font-size' => array( __( 'Font Size' ), '14px'),
					'color' => array( __( 'Font Color' ), '#444' ),
				),
				'.fca_eoi_layout_3.' . $class . ' div.fca_eoi_layout_name_field_wrapper' => array(
					'border-color' => array( __( 'Border Color' ), '#D2D2D2' ),
				),
			),
			'email_field' => array(
				'.fca_eoi_layout_3.' . $class . ' div.fca_eoi_layout_email_field_wrapper, ' .
				'.fca_eoi_layout_3.' . $class . ' div.fca_eoi_layout_email_field_wrapper input, ' .
				'.fca_eoi_layout_3.' . $class . ' div.fca_eoi_layout_email_field_wrapper i.fa:before' => array(
					'font-size' => array( __( 'Font Size' ), '14px'),
					'color' => array( __( 'Font Color' ), '#444' ),
				),
				'.fca_eoi_layout_3.' . $class . ' div.fca_eoi_layout_email_field_wrapper' => array(
					'border-color' => array( __( 'Border Color' ), '#D2D2D2' ),
				),
			),
			'button' => array(
				'.fca_eoi_layout_3.' . $class . ' div.fca_eoi_layout_submit_button_wrapper input' => array(
					'font-size' => array( __( 'Font Size' ), '14px'),
					'color' => array( __( 'Font Color' ), '#FFF' ),
					'background-color' => array( __( 'Background Color' ), '#D35500' ),
					'border-color' => array( __( 'Border Color' ), '#ac4500' ),
				),
				'.fca_eoi_layout_3.' . $class . ' div.fca_eoi_layout_submit_button_wrapper input:hover' => array(
					'background-color' => array( __( 'Hover Background Color' ), '#ac4500' ),
				),
			),
			'privacy' => array(
				'.fca_eoi_layout_3.' . $class . ' div.fca_eoi_layout_privacy_copy_wrapper div' => array(
					'font-size' => array( __( 'Font Size' ), '13px'),
					'color' => array( __( 'Font Color' ), '#B3B3B3' ),
				),
			),
			'fatcatapps' => array(
				'.fca_eoi_layout_3.' . $class . ' div.fca_eoi_layout_fatcatapps_link_wrapper a, ' .
				'.fca_eoi_layout_3.' . $class . ' div.fca_eoi_layout_fatcatapps_link_wrapper a:hover' => array(
					'color' => array( __( 'Font Color' ), '#D8722B'),
				),
			),
		),

		'autocolors' => array(
			array(
				'source' => '[.fca_eoi_layout_3.' . $class . ' div.fca_eoi_layout_headline_copy_wrapper div][background-color]',
				'destination' => '[.fca_eoi_layout_3.' . $class . ' svg.fca_eoi_layout_headline_copy_triangle][fill]',
				'operations' => array(),
			),
			array(
				'source' => '[.fca_eoi_layout_3.' . $class . ' div.fca_eoi_layout_submit_button_wrapper input][background-color]',
				'destination' => '[.fca_eoi_layout_3.' . $class . ' div.fca_eoi_layout_submit_button_wrapper input][border-color]',
				'operations' => array(
					'spin' => '-0.10084867188361457',
					'darken' =>  '7.647058823529407',
				),
			),
			array(
				'source' => '[.fca_eoi_layout_3.' . $class . ' div.fca_eoi_layout_submit_button_wrapper input][background-color]',
				'destination' => '[.fca_eoi_layout_3.' . $class . ' div.fca_eoi_layout_submit_button_wrapper input:hover][background-color]',
				'operations' => array(
					'spin' => '-0.10084867188361457',
					'darken' =>  '7.647058823529407',
				),
			),
		),

		'texts' => $texts
	);
}