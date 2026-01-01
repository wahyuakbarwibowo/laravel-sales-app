<?php

namespace App;

enum SaleStatus: string
{
    case BELUM_DIBAYAR = 'BELUM_DIBAYAR';
    case BELUM_DIBAYAR_SEPENUHNYA = 'BELUM_DIBAYAR_SEPENUHNYA';
    case SUDAH_DIBAYAR = 'SUDAH_DIBAYAR';
}
