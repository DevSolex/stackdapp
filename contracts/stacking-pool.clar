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

(define-public (set-pool-operator (new-operator principal))
  (asserts! (is-eq (tx-sender) (var-get pool-operator)) err-not-pool-operator)
  (var-set pool-operator new-operator)
  (ok true))

(define-public (set-current-cycle (cycle uint))
  (asserts! (is-eq (tx-sender) (var-get pool-operator)) err-not-pool-operator)
  (var-set current-cycle cycle)
  (ok true))

;; Deposit STX into the stacking pool. Increases your share of rewards.
(define-public (deposit (amount-ustx uint))
  (let ((sender (tx-sender)))
    (asserts! (is-gt amount-ustx u0) err-amount-zero)
    (asserts!
      (stx-transfer? amount-ustx sender (as-contract (tx-sender)))
      err-transfer-failed)
    (var-set total-stacked (+ (var-get total-stacked) amount-ustx))
    (map-set stacked-balance sender
      (+ (default-to u0 (map-get? stacked-balance sender)) amount-ustx))
    (ok amount-ustx)))

;; Withdraw STX from the pool. Decreases your share.
(define-public (withdraw (amount-ustx uint))
  (let ((sender (tx-sender))
        (balance (default-to u0 (map-get? stacked-balance sender))))
    (asserts! (is-gt amount-ustx u0) err-amount-zero)
    (asserts! (is-geq balance amount-ustx) err-insufficient-balance)
    (asserts!
      (as-contract (stx-transfer? amount-ustx (tx-sender) sender))
      err-transfer-failed)
    (var-set total-stacked (- (var-get total-stacked) amount-ustx))
    (map-set stacked-balance sender (- balance amount-ustx))
    (ok amount-ustx)))
