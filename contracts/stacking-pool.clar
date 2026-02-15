;; STX Stacking Rewards Pool
;; Users deposit STX; contract tracks shares for BTC reward distribution.
;; Reward share = (user balance / total stacked) * 10000 basis points

(define-constant err-amount-zero (err u100))
(define-constant err-insufficient-balance (err u101))
(define-constant err-not-pool-operator (err u102))
(define-constant err-transfer-failed (err u103))

(define-data-var total-stacked uint u0)
(define-map stacked-balance principal uint)

(define-data-var pool-operator principal (tx-sender))
(define-data-var current-cycle uint u1)

;; Only pool operator can update cycle and operator
(define-read-only (is-pool-operator (who principal))
  (is-eq (var-get pool-operator) who))

(define-read-only (get-balance (user principal))
  (default-to u0 (map-get? stacked-balance user)))

(define-read-only (get-total-stacked)
  (var-get total-stacked))

(define-read-only (get-reward-share (user principal))
  (let ((total (var-get total-stacked))
        (balance (default-to u0 (map-get? stacked-balance user))))
    (if (is-eq total u0)
      u0
      (/ (* balance u10000) total))))

(define-read-only (get-current-cycle)
  (var-get current-cycle))
