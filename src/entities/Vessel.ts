import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Vessel {
  @PrimaryColumn()
  vsl_cd: string;

  @Column({ nullable: true })
  vsl_clss_flg: string;

  @Column({ nullable: true })
  vsl_eng_nm: string;

  @Column({ nullable: true })
  vsl_locl_nm: string;

  @Column({ nullable: true })
  foil_capa: number;

  @Column({ nullable: true })
  doil_capa: number;

  @Column({ nullable: true })
  frsh_wtr_capa: number;

  @Column({ nullable: true })
  call_sgn_no: string;

  @Column({ nullable: true })
  rgst_no: string;

  @Column({ nullable: true })
  phn_no: string;

  @Column({ nullable: true })
  fax_no: string;

  @Column({ nullable: true })
  tlx_no: string;

  @Column({ nullable: true })
  vsl_eml: string;

  @Column({ nullable: true })
  piclb_desc: string;

  @Column({ nullable: true })
  rgst_port_cd: string;

  @Column({ nullable: true })
  clss_no_rgst_area_nm: string;

  @Column({ nullable: true })
  vsl_clss_no: string;

  @Column({ nullable: true })
  vsl_bldr_nm: string;

  @Column({ nullable: true })
  loa_len: number;

  @Column({ nullable: true })
  lbp_len: number;

  @Column({ nullable: true })
  vsl_wdt: number;

  @Column({ nullable: true })
  vsl_dpth: number;

  @Column({ nullable: true })
  smr_drft_hgt: number;

  @Column({ nullable: true })
  dwt_wgt: number;

  @Column({ nullable: true })
  lgt_shp_tong_wgt: number;

  @Column({ nullable: true })
  grs_rgst_tong_wgt: number;

  @Column({ nullable: true })
  net_rgst_tong_wgt: number;

  @Column({ nullable: true })
  pnm_gt_wgt: number;

  @Column({ nullable: true })
  pnm_net_tong_wgt: number;

  @Column({ nullable: true })
  suz_gt_wgt: number;

  @Column({ nullable: true })
  suz_net_tong_wgt: number;

  @Column({ nullable: true })
  mn_eng_mkr_nm: string;

  @Column({ nullable: true })
  mn_eng_tp_desc: string;

  @Column({ nullable: true })
  mn_eng_bhp_pwr: number;

  @Column({ nullable: true })
  vsl_own_ind_cd: string;

  @Column({ nullable: true })
  vsl_rgst_cnt_cd: string;

  @Column({ nullable: true })
  vsl_bld_cd: string;

  @Column({ nullable: true })
  crr_cd: string;

  @Column({ nullable: true })
  fdr_div_cd: string;

  @Column({ nullable: true })
  vsl_svc_spd: number;

  @Column({ nullable: true })
  max_spd: number;

  @Column({ nullable: true })
  ecn_spd: number;

  @Column({ nullable: true })
  crw_knt: number;

  @Column({ nullable: true })
  cntr_dzn_capa: number;

  @Column({ nullable: true })
  cntr_op_capa: number;

  @Column({ nullable: true })
  cntr_pnm_capa: number;

  @Column({ nullable: true })
  cntr_vsl_clss_capa: number;

  @Column({ nullable: true })
  rf_rcpt_knt: number;

  @Column({ nullable: true })
  rf_rcpt_max_knt: number;

  @Column({ nullable: true })
  fbd_capa: number;

  @Column({ nullable: true })
  dpl_capa: number;

  @Column({ nullable: true })
  blst_tnk_capa: number;

  @Column({ nullable: true })
  foil_csm: number;

  @Column({ nullable: true })
  doil_csm: number;

  @Column({ nullable: true })
  frsh_wtr_csm: number;

  @Column({ nullable: true })
  mn_eng_rpm_pwr: number;

  @Column({ nullable: true })
  gnr_rpm_pwr: number;

  @Column({ nullable: true })
  vsl_hgt: number;

  @Column({ nullable: true })
  rgst_dt: Date;

  @Column({ nullable: true })
  vsl_edi_nm: string;

  @Column({ nullable: true })
  co_cd: string;

  @Column({ nullable: true })
  vsl_clz_dt: string;

  @Column({ nullable: true })
  vsl_cre_ofc_cd: string;

  @Column({ nullable: true })
  vsl_delt_ofc_cd: string;

  @Column({ nullable: true })
  vsl_bld_area_nm: string;

  @Column({ nullable: true })
  gnr_mkr_nm: string;

  @Column({ nullable: true })
  gnr_tp_desc: string;

  @Column({ nullable: true })
  gnr_bhp_pwr: number;

  @Column({ nullable: true })
  bwthst_mkr_nm: string;

  @Column({ nullable: true })
  bwthst_tp_desc: string;

  @Column({ nullable: true })
  bwthst_bhp_pwr: number;

  @Column({ nullable: true })
  bwthst_rpm_pwr: number;

  @Column({ nullable: true })
  lloyd_no: string;

  @Column({ nullable: true })
  vsl_lnch_dt: Date;

  @Column({ nullable: true })
  vsl_de_dt: Date;

  @Column({ nullable: true })
  vsl_kel_ly_dt: Date;

  @Column({ nullable: true })
  vsl_hl_no: string;

  @Column({ nullable: true })
  ttl_teu_knt: number;

  @Column({ nullable: true })
  vsl_htch_knt: number;

  @Column({ nullable: true })
  vsl_hld_knt: number;

  @Column({ nullable: true })
  vsl_rmk: string;

  @Column({ nullable: true })
  intl_tong_certi_flg: string;

  @Column({ nullable: true })
  madn_voy_suz_net_tong_wgt: number;

  @Column({ nullable: true })
  vsl_sft_cstru_certi_exp_dt: Date;

  @Column({ nullable: true })
  vsl_sft_rdo_certi_exp_dt: Date;

  @Column({ nullable: true })
  vsl_sft_eq_certi_exp_dt: Date;

  @Column({ nullable: true })
  vsl_lod_line_certi_exp_dt: Date;

  @Column({ nullable: true })
  vsl_derat_certi_exp_dt: Date;

  @Column({ nullable: false })
  cre_usr_id: string;

  @Column({ nullable: false })
  cre_dt: Date;

  @Column({ nullable: false })
  upd_usr_id: string;

  @Column({ nullable: false })
  upd_dt: Date;

  @Column({ nullable: true })
  delt_flg: string;

  @Column({ nullable: true })
  eai_evnt_dt: Date;

  @Column({ nullable: true })
  eai_if_id: string;

  @Column({ nullable: true })
  modi_vsl_cd: string;

  @Column({ nullable: true })
  edw_upd_dt: Date;

  @Column({ nullable: true })
  modi_vsl_opr_tp_cd: string;

  @Column({ nullable: true })
  modi_ownr_nm: string;

  @Column({ nullable: true })
  modi_alln_vsl_cd: string;

  @Column({ nullable: true })
  nyk_lgcy_vsl_cd_ctnt: string;

  @Column({ nullable: true })
  mol_lgcy_vsl_cd_ctnt: string;

  @Column({ nullable: true })
  kline_lgcy_vsl_cd_ctnt: string;

  @Column({ nullable: true })
  lgcy_co_cd: string;
}
