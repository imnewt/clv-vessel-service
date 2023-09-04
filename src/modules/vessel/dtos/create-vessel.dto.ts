import { IsNotEmpty } from 'class-validator';

export class CreateVesselDto {
  @IsNotEmpty()
  vsl_cd: string;

  vsl_clss_flg: string;

  vsl_eng_nm: string;

  vsl_locl_nm: string;

  foil_capa: number;

  doil_capa: number;

  frsh_wtr_capa: number;

  call_sgn_no: string;

  rgst_no: string;

  phn_no: string;

  fax_no: string;

  tlx_no: string;

  vsl_eml: string;

  piclb_desc: string;

  rgst_port_cd: string;

  clss_no_rgst_area_nm: string;

  vsl_clss_no: string;

  vsl_bldr_nm: string;

  loa_len: number;

  lbp_len: number;

  vsl_wdt: number;

  vsl_dpth: number;

  smr_drft_hgt: number;

  dwt_wgt: number;

  lgt_shp_tong_wgt: number;

  grs_rgst_tong_wgt: number;

  net_rgst_tong_wgt: number;

  pnm_gt_wgt: number;

  pnm_net_tong_wgt: number;

  suz_gt_wgt: number;

  suz_net_tong_wgt: number;

  mn_eng_mkr_nm: string;

  mn_eng_tp_desc: string;

  mn_eng_bhp_pwr: number;

  vsl_own_ind_cd: string;

  vsl_rgst_cnt_cd: string;

  vsl_bld_cd: string;

  crr_cd: string;

  fdr_div_cd: string;

  vsl_svc_spd: number;

  max_spd: number;

  ecn_spd: number;

  crw_knt: number;

  cntr_dzn_capa: number;

  cntr_op_capa: number;

  cntr_pnm_capa: number;

  cntr_vsl_clss_capa: number;

  rf_rcpt_knt: number;

  rf_rcpt_max_knt: number;

  fbd_capa: number;

  dpl_capa: number;

  blst_tnk_capa: number;

  foil_csm: number;

  doil_csm: number;

  frsh_wtr_csm: number;

  mn_eng_rpm_pwr: number;

  gnr_rpm_pwr: number;

  vsl_hgt: number;

  rgst_dt: Date;

  vsl_edi_nm: string;

  co_cd: string;

  vsl_clz_dt: string;

  vsl_cre_ofc_cd: string;

  vsl_delt_ofc_cd: string;

  vsl_bld_area_nm: string;

  gnr_mkr_nm: string;

  gnr_tp_desc: string;

  gnr_bhp_pwr: number;

  bwthst_mkr_nm: string;

  bwthst_tp_desc: string;

  bwthst_bhp_pwr: number;

  bwthst_rpm_pwr: number;

  lloyd_no: string;

  vsl_lnch_dt: Date;

  vsl_de_dt: Date;

  vsl_kel_ly_dt: Date;

  vsl_hl_no: string;

  ttl_teu_knt: number;

  vsl_htch_knt: number;

  vsl_hld_knt: number;

  vsl_rmk: string;

  intl_tong_certi_flg: string;

  madn_voy_suz_net_tong_wgt: number;

  vsl_sft_cstru_certi_exp_dt: Date;

  vsl_sft_rdo_certi_exp_dt: Date;

  vsl_sft_eq_certi_exp_dt: Date;

  vsl_lod_line_certi_exp_dt: Date;

  vsl_derat_certi_exp_dt: Date;

  cre_usr_id: string;

  cre_dt: Date;

  upd_usr_id: string;

  upd_dt: Date;

  delt_flg: string;

  eai_evnt_dt: Date;

  eai_if_id: string;

  modi_vsl_cd: string;

  edw_upd_dt: Date;

  modi_vsl_opr_tp_cd: string;

  modi_ownr_nm: string;

  modi_alln_vsl_cd: string;

  nyk_lgcy_vsl_cd_ctnt: string;

  mol_lgcy_vsl_cd_ctnt: string;

  kline_lgcy_vsl_cd_ctnt: string;

  lgcy_co_cd: string;
}
