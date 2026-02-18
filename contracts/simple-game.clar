;; simple-game
;; A simple game that rewards users with MINI tokens

(define-constant err-transfer-failed (err u100))

(define-public (play)
  (begin
    ;; In a real game, logic would go here.
    ;; For now, simply reward the player.
    
    ;; Mint 10 MINI tokens to the player
    ;; We assume the contract is authorized to mint or owns the supply.
    ;; Actually, for SIP-10 mint to work from this contract, this contract needs to be the owner of mini-coin,
    ;; OR mini-coin needs to allow this contract to mint.
    ;; In the simple mini-coin implementation, only the contract owner (deployer) can mint.
    ;; So valid flow: Deployer calls mini-coin to mint.
    ;; If we want THIS contract to mint, we need to ownership transfer or specific capability.
    ;; Let's assume standard behavior:
    ;; 1. Deployer deploys mini-coin.
    ;; 2. Deployer deploys simple-game.
    ;; 3. Deployer transfers ownership of mini-coin to simple-game (or we add 'set-minter' to mini-coin).
    
    ;; For simplicity in this demo, let's assume `mini-coin` allows the `tx-sender` to be the contract-owner
    ;; IF the `simple-game` contract is the `contract-owner` of `mini-coin`.
    ;; So we will just call mint.
    
    (as-contract (contract-call? .mini-coin mint u10000000 tx-sender))
  )
)
